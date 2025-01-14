import { testClient } from "hono/testing";
import { describe, expect, it } from "vitest";

import { HTTP_STATUS } from "@/lib/constants";
import { createApp } from "@/lib/hono-app";

import { router } from ".";

const client = testClient(createApp().route("/", router));

describe("/games", () => {
  it("should list all games", async () => {
    const response = await client.games.$get();

    expect(response.status).toBe(HTTP_STATUS.OK.CODE);
  });

  it("should bring one specific game (game_1)", async () => {
    const response = await client.games[":id"].$get({
      param: {
        id: "game_1",
      },
    });

    expect(response.status).toBe(HTTP_STATUS.OK.CODE);
  });

  it("should return 404 when get an inexistent game id", async () => {
    const response = await client.games[":id"].$get({
      param: {
        id: "game_999",
      },
    });

    expect(response.status).toBe(HTTP_STATUS.NOT_FOUND.CODE);
  });
});
