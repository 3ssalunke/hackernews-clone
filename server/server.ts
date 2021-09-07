import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import nextApp from "next";
import express from "express";
import { parse } from "url";
import { ServerResponse } from "http";
import { APP_PORT, dev, GRAPHQL_PATH, HN_API_URL } from "../src/config";
import { HnDatabase } from "./database/database";
import { HnCache } from "./database/cache";
import { ItemService } from "./services/item.service";
import { IGraphqlSchemaContext, resolvers } from "./graphql-resolver";
import { typeDefs } from "./graphql-schema";
import { seedCache } from "./database/cacheWarmer";
import { FeedService } from "./services/feed.service";

const app = nextApp({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    const cache = new HnCache();
    const db = new HnDatabase(HN_API_URL, cache);
    // seedCache(db, cache, 15000);

    const itemService = new ItemService(db, cache);
    const feedService = new FeedService(db, cache);

    const expressServer = express();

    const apolloServer = new ApolloServer({
      context: ({ req }): IGraphqlSchemaContext => ({
        itemService,
        feedService,
      }),
      introspection: true,
      resolvers,
      typeDefs,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: expressServer, path: GRAPHQL_PATH });

    expressServer.use(
      express.urlencoded({ extended: false }) as express.Handler
    );

    expressServer.get("/news", (req, res) => {
      const actualPage = "/";
      void app.render(req, res as ServerResponse, actualPage);
    });

    expressServer.get("*", (req, res) => {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);

      void handle(req, res as ServerResponse, parsedUrl);
    });

    expressServer.listen(APP_PORT, () => {
      console.log(`> App listening on port ${APP_PORT}`);
    });
  })
  .catch((err) => {
    console.error((err as Error).stack);
    process.exit(1);
  });
