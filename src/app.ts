import { configureOpenAPI } from "@/lib/config-openapi";
import { createApp } from "@/lib/hono-app";
import { router as indexRoutes } from "@/routes";
import { router as gamesRoutes } from "@/routes/games";

export const app = createApp();

configureOpenAPI(app);

const routes = [
  indexRoutes,
  gamesRoutes,
];

for (const route of routes) {
  app.route("/", route);
}
