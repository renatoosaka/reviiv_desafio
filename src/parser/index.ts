import fs from "node:fs";
import path from "node:path";
import { pipeline, Readable } from "node:stream";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readableStream = Readable.from(
  fs.createReadStream(path.join(__dirname, "games.log"), {
    encoding: "utf-8",
  }),
);

pipeline(readableStream, process.stdout, (err) => {
  if (err) {
    console.error("Pipeline failed", err);
  }
  else {
    console.info("Pipeline succeeded");
  }
});
