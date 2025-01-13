import { apiReference } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "@/lib/types";

import packageJSON from "../../package.json" with { type: "json" };

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/openapi", {
    openapi: "3.0.0",
    info: {
      title: "Reviiv Challenge",
      version: packageJSON.version,
    },
  });

  app.get("/reference", apiReference({
    layout: "classic",
    theme: "saturn",
    spec: {
      url: "/openapi",
    },
  }));
}
