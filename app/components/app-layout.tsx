import { useMemo } from "react";
import { useLocation } from "react-router";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import { FloatingChartInterface } from "./floating-chat-interface";
import { ThemeToggle } from "./theme-toggle";
import { ChatContext } from "~/lib/context/chat-context";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isOnAiRoute = location.pathname.startsWith("/ai");

  const chatHook = useChat({
    transport: new DefaultChatTransport({
      api: "/ai/chat",
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
    };
  }, [
    chatHook.messages,
    chatHook.sendMessage,
    chatHook.stop,
    chatHook.status,
    userMessageHistory,
  ]);

  return (
    <ChatContext.Provider value={contextValue}>
      <div className="bg-background size-full min-h-dvh transition-colors ease-in-out duration-500">
        {children}
        <div className="fixed flex items-center justify-center bottom-10 w-full z-50">
          <FloatingChartInterface />
          <ThemeToggle className="absolute right-10" />
        </div>
      </div>
    </ChatContext.Provider>
  );
}
