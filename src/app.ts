import { configureOpenAPI } from "@/lib/config-openapi";
import { createApp } from "@/lib/hono-app";
import { router as indexRoutes } from "@/routes";

export const app = createApp();

configureOpenAPI(app);

const routes = [
  indexRoutes,
];

for (const route of routes) {
  app.route("/", route);
}
