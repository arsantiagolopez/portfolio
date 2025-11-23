import { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
  type Conversation,
  conversationService,
} from "../services/conversations";

export function useConversations() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const conversationId = searchParams.get("id");

  // Load conversations on mount and set up listener
  useEffect(() => {
    const loadConversations = () => {
      setConversations(conversationService.list());
    };

    loadConversations();

    // Listen for storage changes (including same-tab updates)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "conversations" || e.key === null) {
        loadConversations();
      }
    };

    // Custom event for same-tab updates
    const handleCustomStorageChange = () => {
      loadConversations();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("conversation-updated", handleCustomStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener(
        "conversation-updated",
        handleCustomStorageChange
      );
    };
  }, []);

  const currentConversation = useMemo(
    () => conversations.find((c) => c.id === conversationId) || null,
    [conversations, conversationId]
  );

  const deleteConversation = useCallback(
    (id: string) => {
      conversationService.delete(id);
      setConversations(conversationService.list());

      // Clear URL if deleting current conversation
      if (id === conversationId) {
        setSearchParams({});
      }
    },
    [conversationId, setSearchParams]
  );

  const loadConversation = useCallback(
    (id: string) => {
      setSearchParams({ id });
    },
    [setSearchParams]
  );

  const startNewConversation = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  return {
    conversations,
    currentConversation,
    conversationId,
    deleteConversation,
    loadConversation,
    startNewConversation,
  };
}
