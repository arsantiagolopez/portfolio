import { type ComponentProps, type ReactNode, useState } from "react";
import { Portal } from "@radix-ui/react-portal";
import { cn } from "~/lib/utils";
import { Icon } from "./icon";
import { Card } from "./card";
import { Button } from "./ui/button";
import { ANIMATION_TIMING_FUNCTION_CLASS } from "~/lib/contants";
import { ScrollArea } from "./ui/scroll-area";

export function Sidebar({
  children,
  header,
}: {
  children: ReactNode;
  header: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className="z-10 fixed left-0 top-0 bottom-0 md:w-px"
        onMouseEnter={() => setIsOpen(true)}
      />

      <TriggerButton
        variant="glass"
        onClick={toggleOpen}
        className={cn(
          "z-10 fixed top-4 right-4 md:left-4 text-foreground transition-opacity duration-300 ease-in",
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

      <Portal>
        <div
          className={cn(
            "z-50 fixed inset-0 md:inset-auto md:left-4 md:top-4 md:bottom-10 flex transition-transform will-change-transform",
            isOpen ? "translate-x-0" : "-translate-x-[calc(100%+2rem)]"
          )}
        >
          <Card
            variant="glass"
            className="w-full md:w-sidebar-width h-full bg-background/50 md:bg-transparent rounded-none md:rounded-3xl overflow-hidden p-0"
          >
            <ScrollArea className="relative size-full text-foreground">
              <div className="sticky top-0 flex justify-between p-4 shrink-0 bg-gradient-to-b from-background to-transparent">
                <h2 className="text-foreground text-lg font-medium">
                  {header}
                </h2>
                <TriggerButton
                  variant="ghost"
                  onClick={toggleOpen}
                  className={cn(
                    "text-foreground md:-m-1 transition-transform duration-300 ease-out",
                    isOpen &&
                      "animate-in slide-in-from-left-[calc(310px-100px)]"
                  )}
                />
              </div>

              <div className="px-4">{children}</div>
            </ScrollArea>
          </Card>
        </div>
      </Portal>
    </>
  );
}

function TriggerButton({
  className,
  iconProps: { className: iconClassName, ...iconProps } = {},
  ...props
}: ComponentProps<typeof Button> & { iconProps?: ComponentProps<"svg"> }) {
  return (
    <Button
      size="icon"
      className={cn("rounded-full", ANIMATION_TIMING_FUNCTION_CLASS, className)}
      {...props}
    >
      <Icon {...iconProps} name="panel" className={iconClassName} />
    </Button>
  );
}
