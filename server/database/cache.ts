import LRU from "lru-cache";
import { ItemModel } from "../../src/model/item.model";
import { UserModel } from "../../src/model/user.model";

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

  userCache = new LRU<string, UserModel>({
    max: 500,
    maxAge: 1000 * 60 * 60,
  });

  setItem(id: number, item: ItemModel): boolean {
    return this.itemsCache.set(id.toString(), item);
  }

  getItem(id: number): ItemModel | undefined {
    return this.itemsCache.get(id.toString());
  }

  setuser(id: string, user: UserModel): UserModel {
    this.userCache.set(id, user);
    return user;
  }

  getUser(id: string): UserModel | undefined {
    return this.userCache.get(id);
  }
}
