import { useFetcher, useRouteLoaderData } from "react-router";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "./ui/button";
import type { loader } from "~/root";
import { cn } from "~/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const data = useRouteLoaderData<typeof loader>("root");
  const fetcher = useFetcher();

  const theme = data?.theme || "system";

  const handleClick = () => {
    const nextTheme =
      theme === "light" ? "dark" : theme === "dark" ? "system" : "light";

    fetcher.submit(
      { theme: nextTheme },
      { method: "POST", action: "/resources/set-theme" }
    );
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleClick}
      aria-label={`Current theme: ${theme}. Click to change.`}
      className={cn(className)}
    >
      {theme === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
      {theme === "system" && <Monitor className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
}
