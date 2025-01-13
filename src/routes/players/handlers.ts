import type { AppRouteHandler } from "@/lib/types";
import type { ListRoute } from "@/routes/players/routes";

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
