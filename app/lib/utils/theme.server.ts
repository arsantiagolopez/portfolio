import { createCookie } from "react-router";

export type Theme = "light" | "dark";

export const themeCookie = createCookie("theme", {
  path: "/",
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
  maxAge: 60 * 60 * 24 * 365, // 1 year
});

export async function getTheme(request: Request): Promise<Theme | null> {
  const cookieHeader = request.headers.get("Cookie");
  const theme = await themeCookie.parse(cookieHeader);
  if (theme === "light" || theme === "dark") return theme;
  return null;
}

export function setTheme(theme: Theme | "system") {
  if (theme === "system") {
    // Clear the cookie to use system preference
    return themeCookie.serialize("", { maxAge: 0 });
  }
  return themeCookie.serialize(theme);
}
