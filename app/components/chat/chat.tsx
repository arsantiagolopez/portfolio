import { useRef } from "react";
import { useNavigate } from "react-router";
import type { UIMessage } from "ai";
import type { useChat } from "@ai-sdk/react";
import { Messages } from "./messages";
import { useScrollPosition } from "~/lib/hooks/use-scroll-position";
import { Icon } from "../icon";
import { useChatContext } from "~/lib/context/chat-context";
import { cn } from "~/lib/utils";
import { ConversationList } from "./conversation-list";

export function Chat({
  messages,
  status,
}: {
  messages: UIMessage[];
  status: ReturnType<typeof useChat>["status"];
}) {
  return (
    <div className="relative flex h-dvh flex-col">
      <Header />
      <ConversationList />

      {messages.length > 0 && (
        <ChatWithScroll messages={messages} status={status} />
      )}
    </div>
  );
}

function Header() {
  const navigate = useNavigate();
  return (
    <div className="z-10 fixed top-0 w-full pt-4 pb-16 bg-gradient-to-b from-background to-transparent pointer-events-none">
      <div className="max-w-3xl mx-auto text-foreground flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg pointer-events-auto p-2 -ml-2"
        >
          <Icon name="arrow-left" />
        </button>
        <h1 className="text-foreground text-4xl font-bold">AI Chat</h1>
      </div>
    </div>
  );
}

function ChatWithScroll({
  messages,
  status,
}: {
  messages: UIMessage[];
  status: ReturnType<typeof useChat>["status"];
}) {
  const { mode } = useChatContext();
  const { containerRef, isAtBottom, scrollToBottom, isAtTop, scrollToTop } =
    useScrollPosition();
  const hasScrolledRef = useRef(false);

  const scrollToBottomOnNavRef = (node: HTMLDivElement | null) => {
    containerRef.current = node;
    if (node && mode === "video" && !hasScrolledRef.current) {
      hasScrolledRef.current = true;
      requestAnimationFrame(() => {
        node.scrollTop = node.scrollHeight;
      });
    }
  };

  return (
    <div className={cn("relative", mode === "video" && "mt-auto")}>
      <div
        ref={scrollToBottomOnNavRef}
        className={cn(
          "scroll-pb-28 pb-28 overflow-y-auto text-sm",
          mode === "chat"
            ? "pt-20 h-dvh"
            : "max-h-[55dvh] pt-20 [mask-image:linear-gradient(to_bottom,transparent,black_8rem,black_calc(100%-8rem),transparent)]"
        )}
      >
        <Messages messages={messages} status={status} />
      </div>

      <ScrollButtons
        isAtTop={isAtTop}
        isAtBottom={isAtBottom}
        scrollToTop={scrollToTop}
        scrollToBottom={scrollToBottom}
      />
    </div>
  );
}

function ScrollButtons({
  isAtTop,
  isAtBottom,
  scrollToTop,
  scrollToBottom,
}: {
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollToTop: ReturnType<typeof useScrollPosition>["scrollToTop"];
  scrollToBottom: ReturnType<typeof useScrollPosition>["scrollToBottom"];
}) {
  const { mode } = useChatContext();

  if (mode === "chat") {
    return !isAtBottom ? (
      <ScrollButton
        direction="bottom"
        onClick={() => scrollToBottom("smooth")}
        className="z-10 absolute bottom-28 left-1/2 -translate-x-1/2 transition-colors"
      />
    ) : null;
  }

  return (
    <div className="z-10 absolute bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
      <ScrollButton
        direction="top"
        isVisible={!isAtTop}
        onClick={() => scrollToTop("smooth")}
        className={cn(!isAtTop && isAtBottom && "translate-x-5")}
      />
      <ScrollButton
        direction="bottom"
        isVisible={!isAtBottom}
        onClick={() => scrollToBottom("smooth")}
        className={cn(!isAtBottom && isAtTop && "-translate-x-5")}
      />
    </div>
  );
}

function ScrollButton({
  direction,
  isVisible = true,
  onClick,
  className,
}: {
  direction: "top" | "bottom";
  isVisible?: boolean;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={direction === "top" ? "Scroll to top" : "Scroll to bottom"}
      className={cn(
        "bg-background hover:bg-muted rounded-full border p-2 shadow-lg transition-all duration-300",
        isVisible
          ? "opacity-100 scale-100 translate-x-0"
          : "opacity-0 scale-0 pointer-events-none",
        className
      )}
      onClick={onClick}
    >
      <Icon
        name="arrow-left"
        className={cn(
          "size-4",
          direction === "top" ? "rotate-90" : "-rotate-90"
        )}
      />
    </button>
  );
}
