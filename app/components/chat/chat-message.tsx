import type { useChat } from "@ai-sdk/react";
// import { ChatSmartObject } from "./chat-smart-object";
import { TypewriterText } from "./typewriter-text";
import { Button } from "../ui/button";
import { useState } from "react";
import { Icon } from "../icon";
// import { LoadingState, SmartObject } from "../../components";

export function ChatMessage({
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
        <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 backdrop-blur-[8px]">
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
    <div className="group/message flex flex-col gap-2 text-glass-foreground">
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

        // @todo – implement tooling
        // if (part.type.startsWith("tool-")) {
        //   const toolPart = part as unknown as {
        //     type: string;
        //     toolCallId: string;
        //     state:
        //       | "input-streaming"
        //       | "input-available"
        //       | "output-available"
        //       | "output-error";
        //     input?: unknown;
        //     output?: unknown;
        //     errorText?: string;
        //   };

        //   const toolName = part.type.replace("tool-", "");

        //   if (toolPart.state === "output-error") {
        //     const outputString = toolPart.output
        //       ? JSON.stringify(toolPart.output, null, 2)
        //       : null;
        //     return (
        //       <div
        //         key={index}
        //         className="bg-destructive/10 text-destructive border-destructive/20 my-4 rounded-lg border p-4 select-text"
        //       >
        //         <div className="font-semibold select-text">
        //           Error executing tool: {toolName}
        //         </div>
        //         {toolPart.errorText && (
        //           <div className="mt-2 select-text">
        //             <pre className="whitespace-pre-wrap select-text">
        //               {toolPart.errorText}
        //             </pre>
        //           </div>
        //         )}
        //         {outputString && (
        //           <details className="mt-2">
        //             <summary className="cursor-pointer select-text">
        //               Debug Info
        //             </summary>
        //             <pre className="mt-2 overflow-x-auto text-xs select-text">
        //               {outputString}
        //             </pre>
        //           </details>
        //         )}
        //       </div>
        //     );
        //   }
        // }
      })}
      {!isLoading && <MessageActions message={message} />}
    </div>
  );
}

function MessageActions({
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
    <Button
      variant="ghost"
      size="icon-sm"
      onClick={handleCopy}
      className="[&>svg]:size-10"
    >
      <Icon name={copied ? "check" : "copy"} />
    </Button>
  );
}
