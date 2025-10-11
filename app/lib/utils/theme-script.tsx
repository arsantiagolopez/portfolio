import type { Theme } from "./theme.server";

export function getSystemTheme(request: Request): { theme: Theme } {
  const cookieHeader = request.headers.get("Cookie");
  const cookies = cookieHeader
    ? Object.fromEntries(cookieHeader.split("; ").map((c) => c.split("=")))
    : {};

  return {
    theme: cookies["system-theme"] === "dark" ? "dark" : "light",
  };
}

// Script that detects system theme preference and syncs it with cookies
export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const getCookie = (name) => {
              const match = document.cookie.split('; ').find(row => row.startsWith(name + '='));
              return match ? match.split('=')[1] : null;
            };
            const setCookie = (name, value) => document.cookie = name + '=' + value + '; path=/; max-age=31536000';
            const media = window.matchMedia('(prefers-color-scheme: dark)');

            // Update system-theme cookie when system preference changes
            const updateTheme = (reload) => {
              const theme = media.matches ? 'dark' : 'light';
              const current = getCookie('system-theme');
              if (current !== theme) {
                setCookie('system-theme', theme);
                if (reload && current) window.location.reload();
              }
            };

            // Set initial theme
            updateTheme(true);

            // Listen for changes when in system mode
            media.addEventListener('change', () => {
              if (!getCookie('theme')) updateTheme(true);
            });
          })();
        `,
      }}
    />
  );
}
