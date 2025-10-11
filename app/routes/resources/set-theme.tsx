import { redirect } from "react-router";
import type { Route } from "./+types/set-theme";
import { setTheme } from "~/lib/utils/theme.server";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const theme = formData.get("theme");
  const referer = request.headers.get("referer") || "/";

  if (theme !== "light" && theme !== "dark" && theme !== "system") {
    return new Response("Invalid theme", { status: 400 });
  }

  // Redirect back to trigger a full page reload for system theme
  return redirect(referer, {
    headers: {
      "Set-Cookie": await setTheme(theme),
    },
  });
}