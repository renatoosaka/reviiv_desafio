import { serve } from "@hono/node-server";

import { app } from "@/app";
import env from "@/env";

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = env.PORT;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
