import { OpenAPIHono } from "@hono/zod-openapi";

import { notFound } from "@/middlewares/not-found";
import { pinoLogger } from "@/middlewares/pino-logger";

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
  });
}
export function createApp() {
  const app = createRouter();

  app.use(pinoLogger());
  app.notFound(notFound);

  return app;
}
