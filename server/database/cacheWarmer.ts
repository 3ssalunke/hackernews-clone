import { FeedType } from "../../src/model/feed.model";
import { HnCache } from "./cache";
import { HnDatabase } from "./database";

function rebuildFeed(db: HnDatabase, cache: HnCache, feedType: FeedType) {
  setTimeout(() => rebuildFeed(db, cache, feedType), 1000 * 60 * 15);

  db.getFeed(feedType)
    .then((feed) => {
      if (feed) {
        return Promise.all(
          feed.map((id: number, i) => {
            if (i < 50) {
              return db.fetchItem(id);
            }
            return;
          })
        ).then((items) => {
          cache[`${feedType}Items`] = items.filter(
            (item) => item !== undefined || item !== null
          );

          cache[feedType] = feed;
          console.log("Updated Feed ids for type: ", feedType);
        });
      }
      return undefined;
    })
    .catch((error) => console.log("Error building feed: ", error));
}

export function seedCache(db: HnDatabase, cache: HnCache, delay: number): void {
  console.log("Waiting ms before seeding the app with data:", delay);
  setTimeout(() => {
    console.log("seeding cache");
    const typeArr = [FeedType.JOB, FeedType.ASK, FeedType.SHOW, FeedType.TOP];
    typeArr.forEach((feedType) => {
      rebuildFeed(db, cache, feedType);
    });
  }, delay);
}
