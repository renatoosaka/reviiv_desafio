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
    this.push(line);
    callback();
  },
});

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
