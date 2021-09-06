import { FeedType } from "../../src/model/feed.model";
import { ItemModel } from "../../src/model/item.model";
import { HnCache } from "../database/cache";
import { HnDatabase } from "../database/database";

export class FeedService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  getForType(type: FeedType): (ItemModel | void)[] {
    console.log("Get", type, "stories");

    switch (type) {
      case FeedType.TOP:
        return this.cache.topItems;
      case FeedType.SHOW:
        return this.cache.showItems;
      case FeedType.JOB:
        return this.cache.jobItems;
      case FeedType.ASK:
        return this.cache.askItems;
      default:
        return [];
    }
  }
}
