import type { AppRouteHandler } from "@/lib/types";
import type { GetOneRoute, ListRoute } from "@/routes/games/routes";

import { HTTP_STATUS } from "@/lib/constants";
import data from "@/parser/games.json" with { type: "json" };
import { gameSchema, gamesSchema, type GamesSchemaType } from "@/routes/games/schema";

export const list: AppRouteHandler<ListRoute> = (c) => {
  const games = data.games;
  const parsed = gamesSchema.parse(games);

  return c.json(parsed);
};

export const getOne: AppRouteHandler<GetOneRoute> = (c) => {
  const { id } = c.req.valid("param");
  const games: GamesSchemaType = data.games;
  const game = games[id];

  if (!game) {
    return c.json({ message: HTTP_STATUS.NOT_FOUND.MESSAGE }, HTTP_STATUS.NOT_FOUND.CODE);
  }

  const parsed = gameSchema.parse(game);

  return c.json(parsed, HTTP_STATUS.OK.CODE);
};
