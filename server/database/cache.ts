import LRU from "lru-cache";
import { ItemModel } from "../../src/model/item.model";

export class HnCache {
  top: number[] = [];
  ask: number[] = [];
  job: number[] = [];
  show: number[] = [];

  topItems: (ItemModel | void)[] = [];

  showItems: (ItemModel | void)[] = [];

  askItems: (ItemModel | void)[] = [];

  jobItems: (ItemModel | void)[] = [];

  itemsCache = new LRU<string, ItemModel>({
    max: 500,
    maxAge: 1000 * 60 * 60,
  });

  setItem(id: number, item: ItemModel): boolean {
    return this.itemsCache.set(id.toString(), item);
  }

  getItem(id: number): ItemModel | undefined {
    return this.itemsCache.get(id.toString());
  }
}
