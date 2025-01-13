import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute } from "@/routes/games/routes";

import data from "@/parser/games.json" with { type: "json" };

import { gamesSchema, type GamesSchemaType } from "./schema";

export const list: AppRouteHandler<ListRoute> = (c) => {
  const games = data.games;
  const parsed = gamesSchema.parse(games);

  return c.json(parsed);
};
