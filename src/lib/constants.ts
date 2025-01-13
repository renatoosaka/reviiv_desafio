export const HTTP_STATUS = {
  NOT_FOUND: {
    CODE: 404,
    MESSAGE: "Not Found",
  },

  UNPROCESSABLE_ENTITY: {
    CODE: 422,
    MESSAGE: "Unprocessable Entity",
  },

  INTERNAL_SERVER_ERROR: {
    CODE: 500,
    MESSAGE: "Internal Server Error",
  },

  OK: {
    CODE: 200,
    MESSAGE: "OK",
  },
} as const;
