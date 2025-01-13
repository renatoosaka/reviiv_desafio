import type { ErrorHandler } from "hono";
import type { ContentfulStatusCode } from "hono/utils/http-status";

import env from "@/env";

import { HTTP_STATUS } from "@/lib/constants";

export const onError: ErrorHandler = (err, c) => {
  const currentStatus = "status" in err
    ? err.status
    : c.newResponse(null).status;
  const statusCode = currentStatus !== HTTP_STATUS.OK.CODE
    ? (currentStatus as ContentfulStatusCode)
    : HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE;

  return c.json(
    {
      message: err.message,
      stack: env.NODE_ENV === "production"
        ? undefined
        : err.stack,
    },
    statusCode,
  );
};
