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
          example: {
            game_1: {
              total_kills: 10,
              players: ["Isgalamido", "Mocinha"],
              kills: {
                Isgalamido: -7,
                Mocinha: 0,
              },
            },
          },
        },
      },
    },
  },
});

export type ListRoute = typeof list;
