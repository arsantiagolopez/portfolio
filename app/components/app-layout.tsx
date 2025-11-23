import { type ReactNode, useCallback, useMemo } from "react";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  useRevalidator,
} from "react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { FloatingChatInput } from "./floating-chat-input";
import { ThemeToggle } from "./theme-toggle";
import { ChatContext } from "~/lib/context/chat-context";
import {
  type Conversation,
  conversationService,
} from "~/lib/services/conversations";
import { generateChatTitle } from "~/lib/utils/generate-chat-title";
import { useTypedMatches } from "~/lib/hooks/use-typed-matches";
import type { clientLoader } from "~/routes/chat/_index";

type ChatRouteLoaderReturnType = Awaited<ReturnType<typeof clientLoader>>;

export function AppLayout({ children }: { children: ReactNode }) {
  const matches = useTypedMatches<ChatRouteLoaderReturnType>();
  const chatRouteData = matches.find(
    (match) => match.id === "routes/chat/_index"
  )?.loaderData;

  const conversation = chatRouteData?.conversation;
  const conversations = chatRouteData?.conversations ?? [];

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const revalidator = useRevalidator();

  const isChatRoute = location.pathname.startsWith("/chat");
  const modeParam = searchParams.get("mode");
  const idParam = searchParams.get("id");
  const chatId = useMemo(() => idParam || crypto.randomUUID(), [idParam]);

  const mode = isChatRoute
    ? modeParam === "video"
      ? "video"
      : "chat"
    : "chat";

  const chatHook = useChat({
    id: chatId,
    messages: conversation?.messages,
    transport: new DefaultChatTransport({
      api: "/chat/action",
    }),
    onFinish: (options) => {
      // @todo – Add analytics or other post-completion logic here
      const messages = options.messages;
      const existingConversation = conversationService.get(chatId);

      if (!existingConversation) {
        const firstUserMessage = messages.find(
          (message) => message.role === "user"
        );
        const textPart = firstUserMessage?.parts?.find(
          (part) => part.type === "text"
        );
        const generatedTitle = generateChatTitle(textPart?.text);

        const newConversation = {
          id: chatId,
          title: generatedTitle,
          messages,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        } satisfies Conversation;

        conversationService.create(newConversation);
        revalidator.revalidate();

        if (!idParam) {
          // Need to use window.location instead of searchParams or location,
          // because both are stale in this callback
          const params = new URLSearchParams(window.location.search);
          params.set("id", chatId);
          navigate(`/chat?${params}`, { replace: true });
        }
      } else {
        const shouldUpdateTitle =
          existingConversation.title === "New conversation" &&
          messages.length > 0;

        const firstUserMessage = messages.find(
          (message) => message.role === "user"
        );
        const textPart = firstUserMessage?.parts?.find(
          (part) => part.type === "text"
        );
        const newTitle = shouldUpdateTitle
          ? generateChatTitle(textPart?.text)
          : undefined;

        const updatedConversation = {
          messages,
          ...(newTitle && { title: newTitle }),
        };

        conversationService.update(chatId, updatedConversation);
        revalidator.revalidate();
      }
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    },
  });

  const userMessageHistory = useMemo(() => {
    return chatHook.messages.reduce<string[]>((acc, message) => {
      if (message.role === "user") {
        const textPart = message.parts.find((part) => part.type === "text");
        if (textPart?.type === "text" && textPart.text) {
          acc.push(textPart.text);
        }
      }
      return acc;
    }, []);
  }, [chatHook.messages]);

  const loadConversation = useCallback(
    (id: string) => {
      const params = new URLSearchParams(window.location.search);
      params.set("id", id);
      navigate(`/chat?${params}`);
    },
    [navigate]
  );

  const deleteConversation = useCallback(
    (id: string) => {
      conversationService.delete(id);
      revalidator.revalidate();

      if (id === idParam) {
        const params = new URLSearchParams(window.location.search);
        params.delete("id");
        navigate(`/chat?${params}`, { replace: true });
      }
    },
    [idParam, navigate, revalidator]
  );

  const startNewConversation = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("id");
    navigate(`/chat?${params}`);
  }, [navigate]);

  const contextValue = useMemo(() => {
    const isLoading =
      chatHook.status === "submitted" || chatHook.status === "streaming";

    return {
      messages: chatHook.messages,
      sendMessage: chatHook.sendMessage,
      stop: chatHook.stop,
      status: chatHook.status,
      isLoading,
      userMessageHistory,
      mode,
      conversations,
      currentConversationId: idParam,
      loadConversation,
      deleteConversation,
      startNewConversation,
    } as const;
  }, [
    chatHook.messages,
    chatHook.sendMessage,
    chatHook.stop,
    chatHook.status,
    userMessageHistory,
    mode,
    conversations,
    idParam,
    loadConversation,
    deleteConversation,
    startNewConversation,
  ]);

  return (
    <ChatContext.Provider value={contextValue}>
      <div className="bg-background size-full min-h-dvh transition-colors ease-in-out duration-500">
        {mode === "video" && (
          <div className="fixed inset-0 z-0 flex items-center justify-center">
            <video
              src="/assets/videos/video-call-waiting.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute size-full object-bottom object-cover"
            />
          </div>
        )}
        {children}
        <div className="z-40 fixed flex items-center justify-center bottom-6 md:bottom-10 w-full pointer-events-none">
          <FloatingChatInput className="pointer-events-auto" />
          {!isChatRoute && (
            <ThemeToggle className="absolute right-10 pointer-events-auto" />
          )}
        </div>
      </div>
    </ChatContext.Provider>
  );
}
