import { OpenAPIHono } from "@hono/zod-openapi";

import { defaultHook } from "@/middlewares/default-hook";
import { notFound } from "@/middlewares/not-found";
import { onError } from "@/middlewares/on-error";
import { pinoLogger } from "@/middlewares/pino-logger";

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
    defaultHook,
  });
}
export function createApp() {
  const app = createRouter();

  app.use(pinoLogger());
  app.notFound(notFound);
  app.onError(onError);

  return app;
}
