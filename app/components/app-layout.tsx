import { useMemo } from "react";
import { useLocation } from "react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { FloatingChatInput } from "./floating-chat-input";
import { ThemeToggle } from "./theme-toggle";
import { ChatContext } from "~/lib/context/chat-context";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isChatRoute = location.pathname.startsWith("/chat");
  const searchParams = new URLSearchParams(location.search);
  const modeParam = searchParams.get("mode");

  const mode = isChatRoute
    ? modeParam === "video"
      ? "video"
      : "chat"
    : "chat";

  const chatHook = useChat({
    transport: new DefaultChatTransport({
      api: "/chat/action",
    }),
    onFinish: () => {
      // @todo – Add analytics or other post-completion logic here
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    },
  });

  const userMessageHistory = useMemo(() => {
    return chatHook.messages.reduce<string[]>((acc, msg) => {
      if (msg.role === "user") {
        const textPart = msg.parts.find((part) => part.type === "text");
        if (textPart?.type === "text" && textPart.text) {
          acc.push(textPart.text);
        }
      }
      return acc;
    }, []);
  }, [chatHook.messages]);

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
    } as const;
  }, [
    chatHook.messages,
    chatHook.sendMessage,
    chatHook.stop,
    chatHook.status,
    userMessageHistory,
    mode,
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
        <div className="z-40 fixed flex items-center justify-center bottom-10 w-full">
          <FloatingChatInput />
          {!isChatRoute && <ThemeToggle className="absolute right-10" />}
        </div>
      </div>
    </ChatContext.Provider>
  );
}
