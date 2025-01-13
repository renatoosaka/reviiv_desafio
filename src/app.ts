import { configureOpenAPI } from "@/lib/config-openapi";
import { createApp } from "@/lib/hono-app";
import { router as indexRoutes } from "@/routes";
import { router as gamesRoutes } from "@/routes/games";
import { router as playersRoutes } from "@/routes/players";

export const app = createApp();

configureOpenAPI(app);

const routes = [
  indexRoutes,
  gamesRoutes,
  playersRoutes,
];

for (const route of routes) {
  app.route("/", route);
}
