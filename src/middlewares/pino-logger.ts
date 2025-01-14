import { pinoLogger as logger } from "hono-pino";
import { randomUUID } from "node:crypto";
import pino from "pino";
import pretty from "pino-pretty";

import env from "@/env";

export function pinoLogger() {
  return logger({
    pino: pino({
      level: env.NODE_ENV === "test" ? "silent" : env.LOG_LEVEL || "info",
    }, env.NODE_ENV === "production" ? undefined : pretty()),
    http: {
      reqId: () => randomUUID(),
    },
  });
}
