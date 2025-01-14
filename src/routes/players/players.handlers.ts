import type { AppRouteHandler } from "@/lib/types";
import type { GameSchemaType } from "@/routes/games/games.schema";
import type { GamesRoute, ListRoute } from "@/routes/players/players.routes";

import { HTTP_STATUS } from "@/lib/constants";
import data from "@/parser/games.json" with { type: "json" };

function getPlayers() {
  const games = data.games;
  const players = new Set();

  Object.values(games).forEach((game) => {
    game.players.forEach((player) => {
      players.add(player);
    });
  });

  return Array.from(players);
}
export const list: AppRouteHandler<ListRoute> = (c) => {
  const players = getPlayers();
  return c.json(players);
};

export const games: AppRouteHandler<GamesRoute> = (c) => {
  const { player_name } = c.req.valid("param");
  const players = getPlayers();

  if (!players.includes(player_name)) {
    return c.json({ message: HTTP_STATUS.NOT_FOUND.MESSAGE }, HTTP_STATUS.NOT_FOUND.CODE);
  }

  const games = data.games;
  const playerGames = Object.entries(games)
    .filter(([, game]) => game.players.includes(player_name))
    .reduce<Record<string, GameSchemaType>>((acc, [id, game]) => {
      acc[id] = game;
      return acc;
    }, {});

  return c.json(playerGames, HTTP_STATUS.OK.CODE);
};
