import { Chat } from "~/components/chat";
import { useChatContext } from "~/lib/context/chat-context";

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
