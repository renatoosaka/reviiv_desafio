import { createRoute, z } from "@hono/zod-openapi";

import { HTTP_STATUS } from "@/lib/constants";
import { gameSchema } from "@/routes/games/schema";

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

export const games = createRoute({
  tags: ["Players"],
  method: "get",
  path: "/players/{player_name}/games",
  summary: "List of Games for a Player",
  request: {
    params: z.object({
      player_name: z.string().openapi({
        param: {
          name: "player_name",
          in: "path",
          required: true,
        },
        required: ["player_name"],
        example: "player_1",
      }),
    }),
  },
  responses: {
    [HTTP_STATUS.OK.CODE]: {
      description: "List of Games",

      content: {
        "application/json": {
          schema: z.record(z.string(), gameSchema),
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
    [HTTP_STATUS.NOT_FOUND.CODE]: {
      description: "Player not found",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Player not found",
            }),
          }),
        },
      },
    },
    [HTTP_STATUS.UNPROCESSABLE_ENTITY.CODE]: {
      description: "Invalid player name",
      content: {
        "application/json": {
          schema: z.object({
            message: z.string().openapi({
              example: "Invalid player name",
            }),
          }),
        },
      },
    },
  },
});

export type ListRoute = typeof list;
export type GamesRoute = typeof games;
