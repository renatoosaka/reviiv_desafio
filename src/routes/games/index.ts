import { createRouter } from "@/lib/hono-app";
import * as handlers from "@/routes/games/handler";
import * as routes from "@/routes/games/routes";

export const router = createRouter()
  .openapi(routes.list, handlers.list);
