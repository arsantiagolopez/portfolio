import { createContext, useContext } from "react";
import type { useChat } from "@ai-sdk/react";

type ChatMode = "chat" | "video";

type ChatContextType = Partial<
  ReturnType<typeof useChat> & {
    isLoading: boolean;
    userMessageHistory: string[];
    mode: ChatMode;
    setMode: (mode: ChatMode) => void;
  }
>;

export const ChatContext = createContext<ChatContextType>({});

export function useChatContext() {
  return useContext(ChatContext);
}
