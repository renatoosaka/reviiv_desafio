import { createRoute } from "@hono/zod-openapi";

import { HTTP_STATUS } from "@/lib/constants";
import { gameSchema } from "@/routes/games/schema";

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
          schema: gameSchema,
        },
      },
    },
  },
});

export type ListRoute = typeof list;
