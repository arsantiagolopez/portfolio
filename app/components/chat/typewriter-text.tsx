import { useState, useRef } from "react";
import { Streamdown } from "streamdown";
import { cn } from "~/lib/utils";

export function TypewriterText({
  text,
  isStreaming,
  className = "",
  charDelay = 1,
}: {
  text: string;
  isStreaming: boolean;
  className?: string;
  charDelay?: number;
}) {
  const [displayedText, setDisplayedText] = useState("");
  const streamedTextRef = useRef("");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  if (!isStreaming && intervalRef.current) {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    streamedTextRef.current = "";
  }

  if (!isStreaming && displayedText !== text) {
    if (displayedText !== text && text) {
      setDisplayedText(text);
    }
  }

  if (isStreaming) {
    streamedTextRef.current = text;

    if (!intervalRef.current && displayedText.length < text.length) {
      intervalRef.current = setInterval(() => {
        setDisplayedText((current) => {
          const streamedText = streamedTextRef.current;

          if (current.length >= streamedText.length) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            return current;
          }

          return streamedText.slice(0, current.length + 1);
        });
      }, charDelay);
    }
  }

  return (
    <FormattedResponse className={className} isAnimating={isStreaming}>
      {displayedText}
    </FormattedResponse>
  );
}

function FormattedResponse({
  children,
  className,
  isAnimating = false,
}: {
  children: string;
  className?: string;
  isAnimating?: boolean;
}) {
  return (
    <Streamdown
      className={cn(
        "flex flex-col gap-4 [&_pre]:max-w-full [&_pre]:overflow-x-auto",
        "[&_[data-code-block-container='true']]:rounded-xl",
        className
      )}
      shikiTheme={["vesper", "catppuccin-latte"]}
      isAnimating={isAnimating}
    >
      {children}
    </Streamdown>
  );
}
