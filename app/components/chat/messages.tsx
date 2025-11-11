import type { useChat } from "@ai-sdk/react";
import { Message } from "./message";

export function Messages({
  messages,
  status,
}: Pick<ReturnType<typeof useChat>, "messages" | "status">) {
  const isStreaming = status === "submitted" || status === "streaming";
  const lastMessage = messages[messages.length - 1];
  const isThinking = isStreaming && lastMessage?.role === "user";

  return (
    <div className="flex flex-col gap-2 mx-auto max-w-3xl py-8">
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          isLoading={isStreaming && index === messages.length - 1}
        />
      ))}
      {isThinking && <ThinkingMessage />}
    </div>
  );
}

export function ThinkingMessage() {
  return <p>Thinking...</p>;
}
