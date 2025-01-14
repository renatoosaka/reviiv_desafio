import { createRouter } from "@/lib/hono-app";
import * as handlers from "@/routes/games/games.handler";
import * as routes from "@/routes/games/games.routes";

export const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.getOne, handlers.getOne);
