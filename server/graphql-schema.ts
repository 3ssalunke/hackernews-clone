import gql from "graphql-tag";

export const typeDefs = gql`
  enum FeedType {
    top
    job
    ask
    show
  }

  scalar Date

  type User {
    id: String!
    about: String
    creationTime: Date!
    dateOfBirth: Date
    email: String
    favorites: [Int]
    firstName: String
    hides: [Int]!
    karma: Int!
    lastName: String
    likes: [Int]!
    posts: [Int]!
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
    me: User
    user(id: String!): User
  }
`;
