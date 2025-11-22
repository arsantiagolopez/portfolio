import { type ComponentProps, type ElementType, useRef } from "react";
import { cn } from "~/lib/utils";
import { Icon } from "../icon";
import { useSidebarContext } from "./sidebar-context";
import { FOCUS_OUTLINE_CLASSES } from "~/lib/contants";

export function SidebarItem({
  as,
  className,
  children,
  onClick,
  onDelete,
  ...props
}: {
  as?: ElementType;
  className?: string;
  onClick?: ComponentProps<"button">["onClick"];
  onDelete?: ComponentProps<"button">["onClick"];
} & Omit<ComponentProps<"li">, "onClick">) {
  const Component: ElementType = as || "div";
  const context = useSidebarContext();
  const itemId = useRef(Math.random().toString(36));

  return (
    <Component
      className={cn(
        "relative group flex items-center w-full rounded-full text-foreground hover:bg-muted/50",
        "aria-[selected=true]:bg-muted/50 aria-[selected=true]:text-active",
        className
      )}
      {...props}
    >
      <button
        ref={(el) => {
          if (el) context.registerItem(itemId.current, el);
          else context.unregisterItem(itemId.current);
        }}
        onClick={onClick}
        onKeyDown={context.handleKeyDown}
        className={cn(
          "flex items-center gap-3 px-4 py-2.5 w-full text-sm rounded-full first-letter:uppercase group-hover:pr-8 transition-all",
          "[&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0 [&_svg]:pointer-events-none",
          FOCUS_OUTLINE_CLASSES
        )}
      >
        {children}
      </button>

      {onDelete && (
        <button
          aria-label="Delete"
          onClick={onDelete}
          className={cn(
            "group/icon absolute right-0 flex items-center pl-2.5 aspect-square h-full rounded-r-full",
            "hover:text-destructive opacity-0 group-hover:opacity-100",
            "focus-visible:opacity-100 focus-visible:text-destructive",
            FOCUS_OUTLINE_CLASSES
          )}
        >
          <Icon name="x" className="size-3 group-hover/icon:scale-110" />
        </button>
      )}
    </Component>
  );
}
