export const IS_SERVER = typeof window === "undefined";

export const dev = process.env.NODE_ENV !== "production";
export const appPath =
  process.env.NODE_ENV === "production" ? "./dist" : "./src";

export const HN_DB_URI =
  process.env.DB_URI || "https://iskbslfbpphtwpdos.stoplight-proxy.io";
export const HN_API_VERSION = process.env.HN_API_VERSION || "/v0";
export const HN_API_URL =
  process.env.HN_API_URL || `${HN_DB_URI}${HN_API_VERSION}`;

export const HOST_NAME = process.env.HOST_NAME || "localhost";
export const APP_PORT = process.env.APP_PORT || 3000;
export const ORIGIN = !IS_SERVER
  ? window.location.origin
  : `http://${HOST_NAME}:${APP_PORT}`;

export const GRAPHQL_PATH = "/graphql";
export const GRAPHIQL_PATH = "/graphiql";
export const GRAPHQL_URI = ORIGIN + GRAPHQL_PATH;
export const useGraphqlPlayground = true;

export const passwordIterations = 10000;
