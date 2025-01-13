import { createRoute, z } from "@hono/zod-openapi";

import { HTTP_STATUS } from "@/lib/constants";
import { createRouter } from "@/lib/hono-app";

export const router = createRouter()
  .openapi(createRoute({
    method: "get",
    path: "/",
    summary: "Main route",
    tags: ["Main"],
    responses: {
      [HTTP_STATUS.OK.CODE]: {
        description: "Reviiv",
        content: {
          "application/json": {
            schema: z.object({
              message: z.string().openapi({ example: "Reviiv Challenge" }),
              timestamp: z.number().openapi({
                example: new Date().getTime(),
              }),
            }),
          },
        },
      },
    },
  }), (c) => {
    return c.json({
      message: "Reviiv Challenge",
      timestamp: new Date().getTime(),
    }, HTTP_STATUS.OK.CODE);
  });
