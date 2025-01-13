import { pinoLogger as logger } from "hono-pino";
import { randomUUID } from "node:crypto";
import pino from "pino";
import pretty from "pino-pretty";

export function pinoLogger() {
  return logger({
    pino: pino({
      level: "debug",
    }, pretty()),
    http: {
      reqId: () => randomUUID(),
    },
  });
}
