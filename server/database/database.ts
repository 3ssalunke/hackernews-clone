import axios, { AxiosInstance } from "axios";
import { FeedType } from "../../src/model/feed.model";
import { ItemModel } from "../../src/model/item.model";
import { HnCache } from "./cache";

export class HnDatabase {
  cache: HnCache;
  axiosInstance: AxiosInstance;

  constructor(apiUri: string, cache: HnCache) {
    this.cache = cache;
    this.axiosInstance = axios.create({
      baseURL: apiUri,
    });
  }

  async fetchItem(id: number): Promise<ItemModel | void> {
    return this.axiosInstance
      .get(`/item/${id}.json`)
      .then((res) => {
        const _item = res.data;

        if (_item) {
          const item = new ItemModel({
            id: _item.id,
            by: _item.by,
            createdAt: _item.time,
            type: _item.type,
            title: _item.title ?? "",
            text: _item.text ?? "",
            parent: _item.parent ?? 0,
            poll: _item.poll ?? 0,
            kids: _item.kids ?? [],
            url: _item.url ?? "",
            parts: _item.parts ?? [],
            descendants: _item.descendants ?? 0,
            score: _item.score ?? 0,
          });

          this.cache.setItem(item.id, item);

          return item;
        }

        throw _item;
      })
      .catch((error) => console.log(error));
  }

  async getFeed(type: FeedType): Promise<number[] | void> {
    return this.axiosInstance.get(`${type}stories.json`).then((res) => {
      const feed = res.data;
      return feed;
    });
  }
}
