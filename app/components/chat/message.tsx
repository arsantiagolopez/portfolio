import { type ReactNode } from "react";
import type { useChat } from "@ai-sdk/react";
import { useChatContext } from "~/lib/context/chat-context";
import { MessageActions } from "./message-actions";
import { TypewriterText } from "./typewriter-text";

export function Message({
  message,
  isLoading = false,
}: {
  message: ReturnType<typeof useChat>["messages"][number];
  isLoading?: boolean;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="group/message flex flex-col gap-2 items-end">
        <div className="bg-primary text-primary-foreground rounded-xl px-4 py-3 md:py-2.5">
          {message.parts.map((part, index) => {
            if (part.type === "text") {
              return (
                <p
                  key={index}
                  className="break-words whitespace-pre-wrap select-text"
                >
                  {part.text}
                </p>
              );
            }
          })}
        </div>
        {!isLoading && <MessageActions message={message} />}
      </div>
    );
  }

  return (
    <div className="group/message flex flex-col gap-2">
      <ConditionalBubble>
        {message.parts.map((part, index) => {
          if (part.type === "text") {
            return (
              <TypewriterText
                key={index}
                text={part.text}
                isStreaming={isLoading}
                className="break-words whitespace-pre-wrap select-text"
              />
            );
          }
        })}
      </ConditionalBubble>
      {!isLoading && <MessageActions message={message} />}
    </div>
  );
}

function ConditionalBubble({ children }: { children: ReactNode }) {
  const { mode } = useChatContext();
  return mode === "video" ? (
    <div className="bg-background text-foreground rounded-xl px-4 py-3 md:py-2.5 min-h-10 w-fit">
      {children}
    </div>
  ) : (
    children
  );
}
