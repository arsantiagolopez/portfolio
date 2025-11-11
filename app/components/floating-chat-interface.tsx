import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { Kbd, KbdGroup } from "./ui/kbd";
import { Button } from "./ui/button";
import { Icon } from "./icon";
import { Spinner } from "./ui/spinner";
import { useChatContext } from "~/lib/context/chat-context";

export function FloatingChartInterface() {
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [_, setSearchParams] = useSearchParams();

  const isChatRoute = location.pathname === "/chat";

  const toggleMode = () => {
    const newMode = mode === "chat" ? "video" : "chat";
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

  return (
    <form
      onSubmit={submitMessage}
      className={cn(
        "relative items-center grid rounded-2xl max-h-16 max-w-3xl bg-glass backdrop-blur-md outline-none shadow-sm dark:shadow-2xl dark:shadow-foreground/5 focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        "transition-all duration-300 ease-in-out",
        isChatRoute ? "min-w-3xl" : "min-w-80"
      )}
    >
      <textarea
        ref={textareaRef}
        name="message"
        value={input}
        onInput={updateInput}
        onKeyDown={handleTextareaKeys}
        className="col-start-1 row-start-1 h-full max-h-16 overflow-y-auto p-4 pl-5 pr-14 rounded-2xl resize-none max-w-3xl break-words outline-none placeholder:text-muted-foreground"
        placeholder="Ask me anything"
        rows={1}
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
              disabled={isLoading}
              onClick={isLoading ? stop : undefined}
              className="group"
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
              <Button variant="ghost" size="icon">
                <Icon name="voice" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMode}
                className={cn(
                  mode === "video" &&
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
        className="col-start-1 row-start-1 max-h-16 invisible whitespace-pre-wrap p-4 pl-5 pr-14 pointer-events-none"
      >
        {input}
      </div>
    </form>
  );
}
