import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),

  ...prefix("chat", [
    index("routes/chat/_index.tsx"),
    route("action", "routes/chat/action.tsx"),
  ]),

  // Theme setting resource route
  route("resources/set-theme", "routes/resources/set-theme.tsx"),

  // Chrome DevTools routes (silent handling)
  route(
    ".well-known/appspecific/com.chrome.devtools.json",
    "./routes/resources/empty.tsx"
  ),
] satisfies RouteConfig;
