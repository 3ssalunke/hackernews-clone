import { FeedType } from "../src/model/feed.model";
import { ItemModel } from "../src/model/item.model";
import { FeedService } from "./services/feed.service";
import { ItemService } from "./services/item.service";

export interface IGraphqlSchemaContext {
  itemService: ItemService;
  feedService: FeedService;
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

    feed(
      _: any,
      { feedType }: { feedType: FeedType },
      context: IGraphqlSchemaContext
    ): (ItemModel | void)[] {
      return context.feedService.getForType(feedType);
    },
  },
};
