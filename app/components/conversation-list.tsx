import { Sidebar, SidebarItem } from "./sidebar";
import { useChatContext } from "~/lib/context/chat-context";
import { Icon } from "./icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { useState } from "react";

export function ConversationList() {
  const [expandedItems, setExpandedItems] = useState(["chats", "others"]);

  const {
    conversations = [],
    currentConversationId,
    loadConversation,
    deleteConversation,
    startNewConversation,
  } = useChatContext();

  return (
    <Sidebar header="Conversations" className="flex flex-col gap-px px-4">
      <div className="p-1">
        <SidebarItem
          aria-label="Create new conversation"
          aria-selected={!currentConversationId}
          onClick={startNewConversation}
        >
          <Icon name="add" />
          New chat
        </SidebarItem>
      </div>

      <Accordion
        type="multiple"
        value={expandedItems}
        onValueChange={setExpandedItems}
      >
        <AccordionItem value="chats" className="border-none">
          <AccordionTrigger className="font-semibold text-foreground/70 hover:no-underline px-4 py-2.5 [&_svg]:text-foreground">
            My chats
          </AccordionTrigger>
          <AccordionContent asChild>
            <ul className="flex flex-col gap-px">
              {!conversations.length ? (
                <p className="text-sm text-muted-foreground px-4 py-2.5">
                  No conversations yet
                </p>
              ) : (
                conversations.map(({ id, title }) => (
                  <SidebarItem
                    key={id}
                    as="li"
                    aria-selected={currentConversationId === id}
                    onClick={() => loadConversation?.(id)}
                    onDelete={() => {
                      if (confirm("Delete this conversation?")) {
                        deleteConversation?.(id);
                      }
                    }}
                  >
                    <Icon name="chat" />
                    <span className="truncate">{title}</span>
                  </SidebarItem>
                ))
              )}
            </ul>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="others" className="border-none">
          <AccordionTrigger className="font-semibold text-foreground/70 hover:no-underline px-4 py-2.5 [&_svg]:text-foreground">
            Other chats
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </Sidebar>
  );
}
