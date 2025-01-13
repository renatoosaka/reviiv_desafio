/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { pipeline, Readable, Transform } from "node:stream";
import url from "node:url";

const INITGAME = "InitGame:";
const KILL = "Kill:";
const USER = "ClientUserinfoChanged:";
const WORLD = "<world>";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const games: Record<string, any> = {};
const currentGame: Record<string, any> = {};

const transformStream = new Transform({
  transform(chunk, _, callback) {
    const line = chunk.toString().trim();

    if (line.includes(INITGAME)) {
      if (!objectIsEmpty(currentGame))
        wrap();

      Object.assign(currentGame, {
        total_kills: 0,
        players: new Set(),
        kills: {},
      });
    }

    if (line.includes(KILL)) {
      const actionRegex = /Kill: \d+ \d+ \d+: (.*)/;
      const [, data] = line.match(actionRegex);

      const playersRegex = /^(.*?) killed (.*?) by/;
      const [, killer, killed] = data.match(playersRegex);

      currentGame.total_kills += 1;

      if (killer === WORLD) {
        currentGame.kills[killed] = currentGame.kills[killed] || 0;
        currentGame.kills[killed] -= 1;
      }
      else {
        currentGame.kills[killer] = currentGame.kills[killer] || 0;
        currentGame.kills[killer] += 1;
      }
    }

    if (line.includes(USER)) {
      const regex = /n\\(.*?)\\t/;
      const [, player] = line.match(regex);

      currentGame.players.add(player);
    }

    callback();
  },

  flush(callback) {
    if (!objectIsEmpty(currentGame))
      wrap();

    this.push(`${JSON.stringify(games, null, 2)}\n`);
    callback();
  },
});

function wrap() {
  games.created_at = new Date().getTime();
  games.games = games.games || {};
  games.games[`game_${gamesCount() + 1}`] = {
    ...currentGame,
    players: Array.from(currentGame.players),
  };

  Object.assign(currentGame, {});
}

function gamesCount() {
  return Object.keys(games.games || {}).length || 0;
}

function objectIsEmpty(obj: Record<string, any>) {
  return Object.keys(obj).length === 0;
}

if (fs.existsSync(path.join(__dirname, "games.json"))) {
  fs.unlinkSync(path.join(__dirname, "games.json"));
}

const readableStream = Readable.from(
  fs.createReadStream(path.join(__dirname, "games.log"), {
    encoding: "utf-8",
  }),
);

const writeableStream = fs.createWriteStream(
  path.join(__dirname, "games.json"),
);

pipeline(readableStream, transformStream, writeableStream, (err) => {
  if (err) {
    console.error("Pipeline failed", err);
  }
  else {
    console.info("Pipeline succeeded");
  }
});
