import type { UIMessage } from "ai";

type Conversation = {
  id: string;
  title: string;
  messages: UIMessage[];
  createdAt: number;
  updatedAt: number;
};

const STORAGE_KEY = "conversations";
const MAX_CONVERSATIONS = 50;

class ConversationService {
  private getAll(): Conversation[] {
    if (typeof window === "undefined") return [];

    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private saveAll(conversations: Conversation[]): void {
    if (typeof window === "undefined") return;

    try {
      const sorted = conversations
        .sort((a, b) => b.updatedAt - a.updatedAt)
        .slice(0, MAX_CONVERSATIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sorted));
    } catch (error) {
      console.error("Failed to save conversations:", error);
    }
  }

  list(): Conversation[] {
    return this.getAll();
  }

  get(id: string): Conversation | undefined {
    return this.getAll().find((c) => c.id === id);
  }

  update(id: string, updates: Partial<Conversation>): Conversation | undefined {
    const conversations = this.getAll();
    const index = conversations.findIndex((c) => c.id === id);

    if (index === -1) return undefined;

    conversations[index] = {
      ...conversations[index],
      ...updates,
      updatedAt: Date.now(),
    };

    this.saveAll(conversations);
    return conversations[index];
  }

  create(conversation: Conversation): void {
    const conversations = this.getAll();
    this.saveAll([conversation, ...conversations]);
  }

  delete(id: string): boolean {
    const conversations = this.getAll();
    const filtered = conversations.filter((c) => c.id !== id);

    if (filtered.length === conversations.length) return false;

    this.saveAll(filtered);
    return true;
  }
}

export const conversationService = new ConversationService();
export type { Conversation };
