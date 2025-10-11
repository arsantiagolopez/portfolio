import type { Route } from "./+types/index";
import { ThemeToggle } from "~/components/theme-toggle";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "React Router + Tailwind v4 + shadcn" },
    { name: "description", content: "Starter with dark mode support" },
  ];
}

export default function IndexRoute() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background p-4 text-foreground">
      <h1 className="text-4xl font-bold">React Router 7 Starter</h1>
      <p className="text-muted-foreground">Tailwind v4 + shadcn + Dark Mode</p>
      <ThemeToggle />
    </div>
  );
}
