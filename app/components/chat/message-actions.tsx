import { useState } from "react";
import type { useChat } from "@ai-sdk/react";
import { Button } from "../ui/button";
import { Icon } from "../icon";

export function MessageActions({
  message,
}: {
  message: ReturnType<typeof useChat>["messages"][number];
}) {
  const text = message.parts
    ?.filter((part) => part.type === "text")
    .map((part) => ("text" in part ? part.text : ""))
    .join("\n")
    .trim();

  return (
    <div className="opacity-0 transition-opacity group-hover/message:opacity-100">
      <CopyButton text={text} />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <Button tabIndex={-1} variant="ghost" size="icon-xs" onClick={handleCopy}>
      <Icon name={copied ? "check" : "copy"} />
    </Button>
  );
}
