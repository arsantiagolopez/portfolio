import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
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
  } = useChatContext();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isOnAiRoute = location.pathname === "/ai";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = input.trim();
    if (!message) return;

    if (sendMessage) {
      sendMessage({
        role: "user",
        parts: [{ type: "text", text: message }],
      });
    }

    if (!isOnAiRoute) {
      navigate("/ai", { viewTransition: true });
    }

    setInput("");
  };

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setInput(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        textareaRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative items-center grid rounded-2xl max-h-16 transition-all duration-300 bg-input/50 backdrop-blur-md outline-none focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
        isOnAiRoute ? "w-full max-w-3xl" : "min-w-80 max-w-3xl"
      )}
    >
      <textarea
        ref={textareaRef}
        name="message"
        value={input}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="col-start-1 row-start-1 h-full max-h-16 overflow-y-auto p-4 pl-5 pr-14 rounded-2xl resize-none max-w-3xl break-all outline-none placeholder:text-muted-foreground"
        placeholder="Ask me anything"
        rows={1}
      />

      <span
        className={cn(
          "absolute right-3",
          !isOnAiRoute && !input && "right-5 pointer-events-none"
        )}
      >
        {isOnAiRoute ? (
          <Button
            type={isLoading ? "button" : "submit"}
            variant="ghost"
            size="icon"
            disabled={!isLoading && !input}
            onClick={isLoading ? stop : undefined}
            className="group"
          >
            {isLoading ? (
              <>
                <Spinner className="group-hover:hidden" />
                <Icon name="x" className="hidden group-hover:block" />
              </>
            ) : (
              <Icon name="right-arrow" />
            )}
          </Button>
        ) : input ? (
          <Button type="submit" variant="ghost" size="icon">
            <Icon name="right-arrow" />
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
