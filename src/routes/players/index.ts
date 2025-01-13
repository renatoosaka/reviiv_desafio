import { createRouter } from "@/lib/hono-app";
import * as handlers from "@/routes/players/handlers";
import * as routes from "@/routes/players/routes";

export const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.games, handlers.games);
