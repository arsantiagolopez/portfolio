import { type ComponentProps, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { Kbd, KbdGroup } from "./ui/kbd";
import { Button } from "./ui/button";
import { Icon } from "./icon";
import { Spinner } from "./ui/spinner";
import { useChatContext } from "~/lib/context/chat-context";
import { LiquidGlass } from "./liquid-glass";

export function FloatingChatInput({
  className,
  ...props
}: ComponentProps<"div">) {
  const {
    sendMessage,
    stop,
    isLoading = false,
    userMessageHistory = [],
    mode = "chat",
  } = useChatContext();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();

  const isChatRoute = location.pathname === "/chat";
  const isChatMode = mode === "chat";

  const toggleMode = () => {
    const newMode = isChatMode ? "video" : "chat";
    if (newMode === "video") {
      setSearchParams({ mode: "video" }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const submitMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = input.trim();
    if (!message) return;

    if (sendMessage) {
      sendMessage({
        role: "user",
        parts: [{ type: "text", text: message }],
      });
    }

    if (!isChatRoute) {
      navigate("/chat", { viewTransition: true });
    }

    setInput("");
  };

  const updateInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleTextareaKeys = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
      setHistoryIndex(-1);
      setTempInput("");
    }

    if (event.key === "Escape" && input) {
      event.preventDefault();
      setInput("");
      setHistoryIndex(-1);
      setTempInput("");
    }

    if (event.key === "ArrowUp" && userMessageHistory.length > 0) {
      event.preventDefault();

      if (historyIndex === -1) {
        setTempInput(input);
      }

      const newIndex = Math.min(
        historyIndex + 1,
        userMessageHistory.length - 1
      );
      setHistoryIndex(newIndex);
      setInput(userMessageHistory[userMessageHistory.length - 1 - newIndex]);
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(userMessageHistory[userMessageHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput(tempInput);
        setTempInput("");
      }
    }
  };

  useEffect(() => {
    const focusOnCmdK = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        textareaRef.current?.focus();
      }
    };

    document.addEventListener("keydown", focusOnCmdK);
    return () => document.removeEventListener("keydown", focusOnCmdK);
  }, []);

  useEffect(() => {
    if (!isChatRoute && !hasInitialized) {
      const timer = setTimeout(() => setHasInitialized(true), 200);
      return () => clearTimeout(timer);
    }
  }, [isChatRoute, hasInitialized]);

  const isFirstMount = !isChatRoute && !hasInitialized;

  return (
    <div
      className={cn(
        "w-[calc(100%-32px)] md:w-auto max-w-3xl h-14 bg-background/20 rounded-2xl overflow-hidden outline-none shadow-sm dark:shadow-2xl dark:shadow-foreground/5 focus-within:border-white focus-within:ring-white/50 focus-within:ring-[3px] transition-all duration-300 ease-in-out",
        isChatRoute || isFirstMount ? "md:min-w-3xl" : "min-w-80",
        className
      )}
      {...props}
    >
      <LiquidGlass className="size-full">
        <form
          onSubmit={submitMessage}
          className="relative items-center grid rounded-2xl h-14 transition-normal duration-300 ease-in-out"
        >
          <textarea
            ref={textareaRef}
            name="message"
            aria-label="Chat message"
            placeholder="Ask me anything"
            value={input}
            onInput={updateInput}
            onKeyDown={handleTextareaKeys}
            rows={1}
            className={cn(
              "col-start-1 row-start-1 h-full p-4 pl-5 pr-14 rounded-2xl resize-none break-words outline-none",
              isChatMode
                ? "placeholder:text-foreground/80"
                : "text-white placeholder:text-white/80"
            )}
          />
          <span
            className={cn(
              "absolute right-3",
              !isChatRoute && !input && "right-5 pointer-events-none"
            )}
          >
            {isChatRoute ? (
              input ? (
                <Button
                  type={isLoading ? "button" : "submit"}
                  variant="ghost"
                  size="icon"
                  aria-label={isLoading ? "Stop generating" : "Send message"}
                  disabled={isLoading}
                  onClick={isLoading ? stop : undefined}
                  className={cn(
                    "group",
                    isChatMode ? "text-foreground" : "md:text-white"
                  )}
                >
                  {isLoading ? (
                    <>
                      <Spinner className="group-hover:hidden" />
                      <Icon name="x" className="hidden group-hover:block" />
                    </>
                  ) : (
                    <Icon name="arrow-right" />
                  )}
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" aria-label="Voice input">
                    <Icon name="voice" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={
                      isChatMode
                        ? "Switch to video mode"
                        : "Switch to chat mode"
                    }
                    onClick={toggleMode}
                    className={cn(
                      !isChatMode &&
                        "bg-white text-black dark:text-black dark:hover:bg-white/90"
                    )}
                  >
                    <Icon name="video" />
                  </Button>
                </div>
              )
            ) : input ? (
              <Button type="submit" variant="ghost" size="icon">
                <Icon name="arrow-right" />
              </Button>
            ) : (
              <KbdGroup>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </KbdGroup>
            )}
          </span>
          <div
            aria-hidden="true"
            className="col-start-1 row-start-1 h-14 invisible whitespace-pre-wrap p-4 pl-5 pr-14 pointer-events-none"
          >
            {input}
          </div>
        </form>
      </LiquidGlass>
    </div>
  );
}
