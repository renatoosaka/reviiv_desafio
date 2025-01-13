import { createRoute, z } from "@hono/zod-openapi";

import { HTTP_STATUS } from "@/lib/constants";
import { gameSchema, gamesSchema } from "@/routes/games/schema";

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

export const getOne = createRoute({
  tags: ["Games"],
  method: "get",
  path: "/games/{id}",
  summary: "Get a Game",
  request: {
    params: z.object({
      id: z.string().openapi({
        param: {
          name: "id",
          in: "path",
          required: true,
        },
        required: ["id"],
        example: "game_1",
      }),
    }),
  },
  responses: {
    [HTTP_STATUS.OK.CODE]: {
      description: "Game",
      content: {
        "application/json": {
          schema: gameSchema,
        },
      },
    },
    [HTTP_STATUS.NOT_FOUND.CODE]: {
      description: "Game not found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Game not found",
            }),
          }),
        },
      },
    },
    [HTTP_STATUS.UNPROCESSABLE_ENTITY.CODE]: {
      description: "Invalid ID",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Invalid ID",
            }),
          }),
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type GetOneRoute = typeof getOne;
