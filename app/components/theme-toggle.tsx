import { useFetcher, useRouteLoaderData } from "react-router";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "./ui/button";
import type { loader } from "~/root";

export function ThemeToggle() {
  const data = useRouteLoaderData<typeof loader>("root");
  const fetcher = useFetcher();

  // Determine the current theme mode
  const userPreference = data?.theme; // User's explicit preference (light/dark) or null
  const systemTheme = data?.systemTheme?.theme || "light"; // System preference from client hint

  // If user has set a preference, show that. Otherwise show "system"
  const currentMode = userPreference || "system";
  const actualTheme = userPreference || systemTheme; // What theme is actually applied

  const handleClick = () => {
    // Cycle: light -> dark -> system -> light
    const nextTheme =
      currentMode === "light" ? "dark" :
      currentMode === "dark" ? "system" : "light";

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
      aria-label={`Current theme: ${currentMode}. Click to change.`}
    >
      {currentMode === "light" && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {currentMode === "dark" && <Moon className="h-[1.2rem] w-[1.2rem]" />}
      {currentMode === "system" && <Monitor className="h-[1.2rem] w-[1.2rem]" />}
    </Button>
  );
}