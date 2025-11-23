import { useRef } from "react";
import { Link } from "react-router";
import type { UIMessage } from "ai";
import type { useChat } from "@ai-sdk/react";
import { Messages } from "./messages";
import { useScrollPosition } from "~/lib/hooks/use-scroll-position";
import { Icon } from "../icon";
import { useChatContext } from "~/lib/context/chat-context";
import { cn } from "~/lib/utils";
import { ConversationList } from "../conversation-list";
import { LiquidGlass } from "../liquid-glass";

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
  return (
    <div className="z-10 fixed top-0 w-full pt-4 pb-16 bg-gradient-to-b from-background to-transparent pointer-events-none">
      <div className="max-w-3xl mx-auto text-foreground flex items-center gap-2 px-4 md:px-0">
        <Link
          to="/"
          className="rounded-lg pointer-events-auto p-2 -ml-2"
          viewTransition
        >
          <Icon name="arrow-left" />
        </Link>
        <h1 className="text-foreground text-3xl md:text-4xl font-bold">
          AI Chat
        </h1>
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
          "scroll-pb-24 md:scroll-pb-28 pb-24 md:pb-28 overflow-y-auto text-sm pt-20",
          mode === "chat"
            ? "h-dvh"
            : "max-h-[55dvh] [mask-image:linear-gradient(to_bottom,transparent,black_8rem,black_calc(100%-8rem),transparent)]"
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
        className="z-10 absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 transition-colors"
      />
    ) : null;
  }

  return (
    <div className="z-10 absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 flex gap-2">
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
    <LiquidGlass
      className={cn(
        "rounded-full [&>div]:pointer-events-none transition-all duration-300",
        isVisible
          ? "opacity-100 scale-100 translate-x-0"
          : "opacity-0 scale-0 pointer-events-none",
        className
      )}
    >
      <button
        type="button"
        aria-label={direction === "top" ? "Scroll to top" : "Scroll to bottom"}
        className="size-full rounded-full shadow-lg p-2 backdrop-blur-md hover:bg-glass/90"
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
    </LiquidGlass>
  );
}
