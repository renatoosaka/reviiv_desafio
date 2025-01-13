import { createRoute, z } from "@hono/zod-openapi";

import { HTTP_STATUS } from "@/lib/constants";

export const list = createRoute({
  tags: ["Players"],
  method: "get",
  path: "/players",
  summary: "List of Players",
  responses: {
    [HTTP_STATUS.OK.CODE]: {
      description: "List of Players",
      content: {
        "application/json": {
          schema: z.array(z.string()),
          example: ["player_1", "player_2"],
        },
      },
    },
  },
});

export type ListRoute = typeof list;
