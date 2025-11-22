import type { Route } from "../+types";
import { Chat } from "~/components/chat";
import { useChatContext } from "~/lib/context/chat-context";
import { conversationService } from "~/lib/services/conversations";

export function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const conversation = id ? conversationService.get(id) : null;
  const conversations = conversationService.list();

  return {
    conversation,
    conversations,
  };
}

export default function ChatRoute() {
  const { messages = [], status } = useChatContext();

  if (!status) {
    return null;
  }

  return <Chat messages={messages} status={status} />;
}

export function meta() {
  return [{ title: "Chat | Portfolio" }];
}
