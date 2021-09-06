export enum FeedType {
  TOP = "top",
  ASK = "ask",
  JOB = "job",
  SHOW = "show",
}

declare type FeedEnumType = keyof typeof FeedType;
