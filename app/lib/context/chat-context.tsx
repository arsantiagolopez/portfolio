import { createContext, useContext } from "react";
import type { useChat } from "@ai-sdk/react";
import type { Conversation } from "../services/conversations";

type ChatMode = "chat" | "video";

type ChatContextType = Partial<
  ReturnType<typeof useChat> & {
    isLoading: boolean;
    userMessageHistory: string[];
    mode: ChatMode;
    conversations: Conversation[];
    currentConversationId: string | null;
    loadConversation: (id: string) => void;
    deleteConversation: (id: string) => void;
    startNewConversation: () => void;
  }
>;

export const ChatContext = createContext<ChatContextType>({});

export function useChatContext() {
  return useContext(ChatContext);
}
