import { Kind } from "graphql";
import { FeedType } from "../src/model/feed.model";
import { ItemModel } from "../src/model/item.model";
import { UserModel } from "../src/model/user.model";
import { FeedService } from "./services/feed.service";
import { ItemService } from "./services/item.service";
import { UserService } from "./services/user.service";

export interface IGraphqlSchemaContext {
  itemService: ItemService;
  feedService: FeedService;
  userService: UserService;
  userId: string;
}

export const resolvers = {
  Query: {
    async item(
      _: any,
      { id }: { id: number },
      context: IGraphqlSchemaContext
    ): Promise<ItemModel | void> {
      return context.itemService.getItem(id);
    },

    async user(
      _,
      { id }: { id: string },
      context: IGraphqlSchemaContext
    ): Promise<UserModel | void> {
      return context.userService.getUser(id);
    },

    async me(_, __, context: IGraphqlSchemaContext): Promise<UserModel | void> {
      return context.userService.getUser(context.userId);
    },

    feed(
      _: any,
      { feedType }: { feedType: FeedType },
      context: IGraphqlSchemaContext
    ): (ItemModel | void)[] {
      return context.feedService.getForType(feedType);
    },
  },

  Date: {
    name: "Date",
    description:
      "UTC number of milliseconds since midnight Jan 1 1970 as in JS date",
    parseValue(value): number {
      return new Date(value).valueOf();
    },
    serlialize(value): number {
      return value instanceof Date ? value.valueOf : value;
    },
    parseLiteral(ast): number | null {
      return ast.kind === Kind.INT ? parseInt(ast.value, 10) : null;
    },
  },
};
