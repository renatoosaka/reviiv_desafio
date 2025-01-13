import { createRoute } from "@hono/zod-openapi";

import { HTTP_STATUS } from "@/lib/constants";
import { gamesSchema } from "@/routes/games/schema";

export const list = createRoute({
  tags: ["Games"],
  method: "get",
  path: "/games",
  summary: "List of Games",
  responses: {
    [HTTP_STATUS.OK.CODE]: {
      description: "List of Games",
      content: {
        "application/json": {
          schema: gamesSchema,
        },
      },
    },
  },
});

export type ListRoute = typeof list;
