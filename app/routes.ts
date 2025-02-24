import {
  type RouteConfig,
  index,
  layout,
  route
} from "@react-router/dev/routes";

export default [
  layout("layouts/base.tsx", [
    index("routes/home.tsx"),
    route("dashboard", "./routes/dashboard.tsx"),
    route("sign-in", "routes/sign-in.tsx"),
  ]),
] satisfies RouteConfig;
