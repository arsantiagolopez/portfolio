import { useRouteLoaderData } from "react-router";
import type { loader } from "~/root";

export function useTheme() {
  const data = useRouteLoaderData<typeof loader>("root");
  const userTheme = data?.theme || "system";
  const systemTheme = data?.systemTheme || "light";

  return userTheme === "system" ? systemTheme : userTheme;
}
