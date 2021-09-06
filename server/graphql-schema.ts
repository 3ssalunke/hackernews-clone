import gql from "graphql-tag";

export const typeDefs = gql`
  enum FeedType {
    top
    job
    ask
    show
  }

  type Item {
    id: Int!
    type: String!
    by: String!
    createdAt: Int!
    text: String!
    parent: Int!
    poll: Int!
    kids: [Int]!
    url: String!
    title: String!
    score: Int!
    parts: [Int]!
    descendants: Int
  }

  type Query {
    item(id: Int!): Item
    feed(feedType: FeedType!): [Item]
  }
`;
