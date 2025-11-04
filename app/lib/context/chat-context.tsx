import { createContext, useContext } from "react";
import type { useChat } from "@ai-sdk/react";

type ChatContextType = Partial<
  ReturnType<typeof useChat> & {
    isLoading: boolean;
    userMessageHistory: string[];
  }
>;

export const ChatContext = createContext<ChatContextType>({});

export function useChatContext() {
  return useContext(ChatContext);
}
