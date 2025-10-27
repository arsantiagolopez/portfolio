import { FloatingChartInterface } from "./floating-chat-interface";
import { ThemeToggle } from "./theme-toggle";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background size-full min-h-dvh transition-colors ease-in-out duration-500">
      {children}
      <div className="fixed flex items-center justify-center bottom-10 w-full">
        <FloatingChartInterface />
        <ThemeToggle className="absolute right-10" />
      </div>
    </div>
  );
}
