import { OpenAPIHono } from "@hono/zod-openapi";

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
  });
}
export function createApp() {
  const app = createRouter();

  return app;
}
