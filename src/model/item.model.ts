// export enum ItemType {
//   JOB = "job",
//   STORY = "story",
//   COMMENT = "comment",
//   POLL = "poll",
//   POLLOPT = "POLLOPT",
// }

export type NewsItem = {
  id: number;
  type: string;
  by: string;
  createdAt: number;
  text: string;
  parent: number;
  poll: number;
  kids: number[];
  url: string;
  score: number;
  title: string;
  parts: number[];
  descendants: number;
};

export class ItemModel {
  public readonly id: number;
  public readonly type: string;
  public readonly by: string;
  public readonly createdAt: number;
  public readonly text: string;
  public readonly parent: number;
  public readonly poll: number;
  public readonly kids: number[];
  public readonly url: string;
  public readonly score: number;
  public readonly title: string;
  public readonly parts: number[];
  public readonly descendants: number;

  constructor(fields: NewsItem) {
    if (!fields.id) {
      throw new Error(
        `Error instantiating News Item, id is required: ${fields.id}`
      );
    } else if (!fields.by) {
      throw new Error(
        `Error instantiating News Item, submitterId is required: ${fields.id}`
      );
    } else if (!fields.type) {
      throw new Error(
        `Error instantiating News Item, title is required: ${fields.id}`
      );
    }

    this.id = fields.id;
    this.type = fields.type;
    this.by = fields.by;
    this.createdAt = fields.createdAt;
    this.text = fields.text;
    this.parent = fields.parent;
    this.poll = fields.poll;
    this.kids = fields.kids;
    this.url = fields.url;
    this.score = fields.score;
    this.title = fields.title;
    this.parts = fields.parts;
    this.descendants = fields.descendants;
  }
}
