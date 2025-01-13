import { configureOpenAPI } from "@/lib/config-openapi";
import { createApp } from "@/lib/hono-app";

export const app = createApp();

configureOpenAPI(app);
