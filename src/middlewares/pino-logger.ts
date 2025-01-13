import env from "@/env";
import { pinoLogger as logger } from "hono-pino";
import { randomUUID } from "node:crypto";
import pino from "pino";
import pretty from "pino-pretty";

export function pinoLogger() {
  return logger({
    pino: pino({
      level: env.LOG_LEVEL || "info",
    }, env.NODE_ENV === "production" ? undefined : pretty()),
    http: {
      reqId: () => randomUUID(),
    },
  });
}
