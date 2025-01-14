import { createRouter } from "@/lib/hono-app";
import * as handlers from "@/routes/players/players.handlers";
import * as routes from "@/routes/players/players.routes";

export const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.games, handlers.games);
