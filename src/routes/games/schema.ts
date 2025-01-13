import { z } from "@hono/zod-openapi";

export const gameSchema = z.object({
  total_kills: z.number().openapi({
    example: 10,
  }),
  players: z.array(z.string()).openapi({
    example: ["Isgalamido", "Mocinha"],
  }),
  kills: z.record(z.string(), z.number()).openapi({
    example: {
      Isgalamido: -7,
      Mocinha: 0,
    },
    additionalProperties: false,
  }),
});

export type GameSchemaType = z.infer<typeof gameSchema>;
