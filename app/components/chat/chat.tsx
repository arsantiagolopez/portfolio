import type { UIMessage } from "ai";
import type { useChat } from "@ai-sdk/react";
import { useNavigate } from "react-router";
import { ArrowDown } from "lucide-react";
import { ChatList } from "./chat-list";
import { useScrollToBottom } from "~/lib/hooks/use-scroll-to-bottom";
import { Icon } from "../icon";

export function Chat({
  messages,
  status,
}: {
  messages: UIMessage[];
  status: ReturnType<typeof useChat>["status"];
}) {
  const { containerRef, isAtBottom, scrollToBottom } = useScrollToBottom();
  const navigate = useNavigate();

  return (
    <div className="relative flex h-screen flex-col">
      <div className="z-10 absolute top-0 w-full pt-4 pb-16 bg-gradient-to-b from-background to-transparent pointer-events-none">
        <div className="max-w-3xl mx-auto text-glass-foreground flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="pointer-events-auto">
            <Icon name="left-arrow" />
          </button>
          <h1 className="text-glass-foreground text-4xl font-bold">AI Chat</h1>
        </div>
      </div>

      <div
        ref={containerRef}
        className="scroll-pb-28 pt-20 pb-28 overflow-y-auto text-sm"
      >
        <ChatList messages={messages} status={status} />
      </div>

      {!isAtBottom && (
        <button
          aria-label="Scroll to bottom"
          className="bg-background hover:bg-muted absolute bottom-28 left-1/2 z-10 -translate-x-1/2 rounded-full border p-2 shadow-lg transition-colors"
          onClick={() => scrollToBottom("smooth")}
          type="button"
        >
          <ArrowDown className="size-4" />
        </button>
      )}
    </div>
  );
}
