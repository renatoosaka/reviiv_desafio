import type { Hook } from "@hono/zod-openapi";

import { HTTP_STATUS } from "@/lib/constants";

export const defaultHook: Hook<any, any, any, any> = (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: result.success,
        error: result.error,
      },
      HTTP_STATUS.UNPROCESSABLE_ENTITY.CODE,
    );
  }
};
