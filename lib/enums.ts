export const ENUMs = {
  GLOBAL: {
    DEFAULT_LANG: "ckb",
    PER_PAGE: 10,
  },
  TAGS: {
    BOTS: "bots",
    HOME_BOTS: "home_bots",
    ONE_BOT: "one_bot",
  },
} as const;

export type ENUMSs = typeof ENUMs;

export type TAGs = ENUMSs["TAGS"][keyof ENUMSs["TAGS"]];
