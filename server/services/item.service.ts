import { ItemModel } from "../../src/model/item.model";
import { HnCache } from "../database/cache";
import { HnDatabase } from "../database/database";

export class ItemService {
  db: HnDatabase;
  cache: HnCache;

  constructor(db: HnDatabase, cache: HnCache) {
    this.db = db;
    this.cache = cache;
  }

  async getItem(id: number): Promise<ItemModel | void> {
    return this.cache.getItem(id) || this.db.fetchItem(id);
  }
}
