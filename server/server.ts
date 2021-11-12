import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import nextApp from "next";
import express from "express";
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy } from "passport-local";
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
import { UserService } from "./services/user.service";
import { UserModel } from "../src/model/user.model";
import session from "express-session";

const SEVEN_DAYS = 1000 * 60 * 60 * 24 * 7;

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
    const userService = new UserService(db, cache);

    const expressServer = express();

    passport.use(
      new (Strategy as any)(
        { usernameField: "id" },
        async (username, password, done) => {
          const user = await userService.getUser(username);
          if (!user) {
            return done(null, false, { message: "Incorrect Username" });
          }
          if (!(await userService.validatePassword(username, password))) {
            return done(null, false, { message: "Incorrect Password" });
          }
          return done(null, user);
        }
      )
    );

    passport.serializeUser((user: unknown, cb) => {
      cb(null, (user as UserModel).id);
    });
    passport.deserializeUser((id: string, cb) => {
      (async (): Promise<void> => {
        const user = await userService.getUser(id);

        cb(null, user || null);
      })();
    });

    expressServer.use(cookieParser("woqeuoru783ih2hd298u2ur2"));
    expressServer.use(
      session({
        cookie: { maxAge: SEVEN_DAYS },
        resave: false,
        rolling: true,
        saveUninitialized: false,
        secret: "woqeuoru783ih2hd298u2ur2",
      })
    );
    expressServer.use(passport.initialize());
    expressServer.use(
      express.urlencoded({ extended: false }) as express.Handler
    );
    expressServer.use(passport.session());

    expressServer.post(
      "/login",
      (req, res, next) => {
        // @ts-ignore
        req.session!.returnTo = req.body.goto;
        next();
      },
      passport.authenticate("local", {
        failureRedirect: "/login?how=unsuccessful",
        successReturnToOrRedirect: "/",
      })
    );
    expressServer.post(
      "/register",
      async (req, res, next) => {
        if (!req.user) {
          try {
            await userService.registerUser({
              id: req.body.id,
              password: req.body.password,
            });
            //@ts-ignore
            req.session!.returnTo = `user?id=${req.body.id}`;
          } catch (error) {
            //@ts-ignore
            req.session!.returnTo = `login?how=${error.code}`;
          }
        } else {
          //@ts-ignore
          req.session!.returnTo = "/login?how=user";
        }
        next();
      },
      passport.authenticate("local", {
        failureRedirect: "/login?how=unsuccessfull",
        successReturnToOrRedirect: "/",
      })
    );

    expressServer.get("/logout", (req, res) => {
      req.logout();
      res.redirect("/");
    });

    const apolloServer = new ApolloServer({
      context: ({ req }): IGraphqlSchemaContext => ({
        itemService,
        feedService,
        userService,
        userId: (req.user as UserModel)?.id,
      }),
      introspection: true,
      resolvers,
      typeDefs,
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app: expressServer, path: GRAPHQL_PATH });

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
