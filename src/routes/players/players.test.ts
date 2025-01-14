import { testClient } from "hono/testing";
import { describe, expect, it } from "vitest";

import { HTTP_STATUS } from "@/lib/constants";
import { createApp } from "@/lib/hono-app";

import { router } from ".";

const client = testClient(createApp().route("/", router));

describe("/players", () => {
  it("should list all players", async () => {
    const response = await client.players.$get();

    expect(response.status).toBe(HTTP_STATUS.OK.CODE);
  });

  it("should bring games for a specific player", async () => {
    const response = await client.players[":player_name"].games.$get({
      param: {
        player_name: "Isgalamido",
      },
    });

    expect(response.status).toBe(HTTP_STATUS.OK.CODE);
  });

  it("should return 404 when get an inexistent player name", async () => {
    const response = await client.players[":player_name"].games.$get({
      param: {
        player_name: "unknow",
      },
    });

    expect(response.status).toBe(HTTP_STATUS.NOT_FOUND.CODE);
  });
});
