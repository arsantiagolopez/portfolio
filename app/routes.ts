import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),

  ...prefix("ai", [
    index("routes/ai/_index.tsx"),
    route("chat", "routes/ai/chat.tsx"),
  ]),

  // Theme setting resource route
  route("resources/set-theme", "routes/resources/set-theme.tsx"),

  // Chrome DevTools routes (silent handling)
  route(
    ".well-known/appspecific/com.chrome.devtools.json",
    "./routes/resources/empty.tsx"
  ),
] satisfies RouteConfig;
