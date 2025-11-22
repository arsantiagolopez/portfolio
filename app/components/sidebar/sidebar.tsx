import {
  type ComponentProps,
  type ReactNode,
  useState,
  useRef,
  useEffect,
} from "react";
import { cn } from "~/lib/utils";
import { Icon } from "../icon";
import { Card } from "../card";
import { Button } from "../ui/button";
import { ANIMATION_TIMING_FUNCTION_CLASS } from "~/lib/contants";
import { ScrollArea } from "../ui/scroll-area";
import { SidebarContext } from "./sidebar-context";

export function Sidebar({
  children,
  header,
  ...props
}: ComponentProps<"div"> & {
  children: ReactNode;
  header: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closedViaKeyboard = useRef(false);
  const openedViaKeyboard = useRef(false);

  const toggleOpen = (event?: React.MouseEvent | React.KeyboardEvent) => {
    const isKeyboard = event && "detail" in event && event.detail === 0;

    if (isKeyboard) {
      closedViaKeyboard.current = isOpen;
      openedViaKeyboard.current = !isOpen;
    }

    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) {
      if (closedViaKeyboard.current) {
        triggerRef.current?.focus();
      }
      closedViaKeyboard.current = false;
      openedViaKeyboard.current = false;
    }
  }, [isOpen]);

  const registerItem = (id: string, el: HTMLButtonElement) => {
    itemRefs.current.set(id, el);
  };

  const unregisterItem = (id: string) => {
    itemRefs.current.delete(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const isFocusNavigationKey = ["Home", "End", ...ARROW_KEYS].includes(
      event.key
    );

    if (isFocusNavigationKey) {
      let candidateNodes = Array.from(itemRefs.current.values());
      const prevKeys = ["ArrowUp", "End"];

      if (prevKeys.includes(event.key)) candidateNodes.reverse();

      if (ARROW_KEYS.includes(event.key)) {
        const currentIndex = candidateNodes.indexOf(
          event.currentTarget as HTMLButtonElement
        );
        candidateNodes = candidateNodes.slice(currentIndex + 1);
      }

      setTimeout(() => focusFirst(candidateNodes));
      event.preventDefault();
    }
  };

  const contextValue = {
    registerItem,
    unregisterItem,
    handleKeyDown,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        className="z-10 fixed left-0 top-0 bottom-0 md:w-px"
        onMouseEnter={() => setIsOpen(true)}
      />

      <TriggerButton
        ref={triggerRef}
        tabIndex={1}
        variant="glass"
        onClick={toggleOpen}
        className={cn(
          "z-10 fixed top-4 right-4 md:left-4 text-foreground bg-glass/10 border border-foreground/5 transition-opacity duration-300 ease-in",
          isOpen && "md:opacity-0 pointer-events-none"
        )}
        iconProps={{
          className: cn(
            "transition-transform duration-500",
            ANIMATION_TIMING_FUNCTION_CLASS,
            !isOpen && "animate-in slide-in-from-right-[calc(310px-100px)]"
          ),
        }}
      />

      <nav
        role="navigation"
        aria-label="Conversations sidebar"
        inert={!isOpen ? true : undefined}
        className={cn(
          "z-50 fixed inset-0 md:inset-auto md:left-4 md:top-4 md:bottom-10 flex transition-transform will-change-transform",
          isOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)]"
        )}
      >
        <Card
          variant="glass"
          className="size-full md:w-sidebar-width bg-background/20 dark:bg-background/40 rounded-none md:rounded-3xl overflow-hidden p-0"
        >
          <ScrollArea
            className={cn(
              "relative size-full text-foreground",
              // @SAD-HACK – Radix's scrollarea doesn't properly constraint the width of it's children
              "[&_[data-radix-scroll-area-viewport]>div]:!block [&_[data-radix-scroll-area-viewport]>div]:max-w-full"
            )}
          >
            <div className="sticky top-0 flex justify-between p-4 shrink-0 bg-gradient-to-b from-background to-transparent">
              <h2 className="text-foreground text-lg font-medium">{header}</h2>
              <TriggerButton
                key={isOpen ? "open" : "closed"}
                autoFocus={openedViaKeyboard.current}
                variant="ghost"
                onClick={toggleOpen}
                className={cn(
                  "md:-m-1 transition-transform duration-300 ease-out",
                  isOpen && "animate-in slide-in-from-left-[calc(310px-100px)]"
                )}
              />
            </div>

            <div {...props}>{children}</div>
          </ScrollArea>
        </Card>
      </nav>
    </SidebarContext.Provider>
  );
}

function TriggerButton({
  className,
  iconProps: { className: iconClassName, ...iconProps } = {},
  ref,
  ...props
}: ComponentProps<typeof Button> & { iconProps?: ComponentProps<"svg"> }) {
  return (
    <Button
      ref={ref}
      size="icon"
      aria-label="Toggle sidebar"
      className={cn(
        "rounded-full text-foreground hover:bg-glass/20",
        ANIMATION_TIMING_FUNCTION_CLASS,
        className
      )}
      {...props}
    >
      <Icon {...iconProps} name="panel" className={iconClassName} />
    </Button>
  );
}

const ARROW_KEYS = ["ArrowUp", "ArrowDown"];

function focusFirst(candidates: HTMLElement[]) {
  const previouslyFocusedElement = document.activeElement;
  return candidates.some((candidate) => {
    if (candidate === previouslyFocusedElement) return true;
    candidate.focus();
    return document.activeElement !== previouslyFocusedElement;
  });
}
