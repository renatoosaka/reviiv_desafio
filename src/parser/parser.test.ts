import { pipeline, Readable, Transform } from "node:stream";
import { promisify } from "node:util";
import split from "split2";
import { afterEach, describe, expect, it } from "vitest";

import { transformStream } from ".";

const pipelineAsync = promisify(pipeline);

let readable: Readable;
let writable: Transform;

async function runPipeline(input: string[]): Promise<string> {
  readable = Readable.from(input);
  writable = new Transform({
    transform(chunk, _, callback) {
      callback(null, chunk);
    },
  });

  let output = "";
  writable.on("data", (chunk) => {
    output += chunk.toString();
  });

  await pipelineAsync(readable, split(), transformStream(), writable);
  return output;
}

afterEach(() => {
  if (readable) {
    readable.destroy();
  }
  if (writable) {
    writable.destroy();
  }
});

describe("transformStream", () => {
  it("should parse InitGame correctly", async () => {
    const input = ["InitGame:"];
    const output = await runPipeline(input);
    expect(output).toContain("total_kills");
  });

  it("should parse Kill correctly", async () => {
    const input = ["InitGame:", "Kill: 1022 2 22: <world> killed Player by MOD_TRIGGER_HURT"];
    const output = await runPipeline(input);
    expect(output).toContain("Player");
  });

  it("should parse ClientUserinfoChanged correctly", async () => {
    const input = ["InitGame:", "ClientUserinfoChanged: 2 n\\Player\\t"];
    const output = await runPipeline(input);
    expect(output).toContain("Player");
  });

  it("should flush correctly", async () => {
    const input = ["InitGame:", "Kill: 1022 2 22: <world> killed Player by MOD_TRIGGER_HURT", "ClientUserinfoChanged: 2 n\\Player\\t"];
    const output = await runPipeline(input);
    expect(output).toContain("total_kills");
    expect(output).toContain("Player");
    expect(output).toContain("games");
  });
});
