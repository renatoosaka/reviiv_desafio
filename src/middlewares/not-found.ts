import type { NotFoundHandler } from "hono";

import { HTTP_STATUS } from "@/lib/constants";

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${HTTP_STATUS.NOT_FOUND.MESSAGE} - ${c.req.path}`,
    },
    HTTP_STATUS.NOT_FOUND.CODE,
  );
};
