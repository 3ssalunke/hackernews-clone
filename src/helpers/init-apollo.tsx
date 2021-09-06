import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { GRAPHQL_URI, IS_SERVER } from "../config";

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

function create(
  initialState: any,
  { getToken }: { getToken: any }
): ApolloClient<NormalizedCacheObject> {
  return new ApolloClient({
    ssrMode: IS_SERVER,
    link: createHttpLink({
      uri: GRAPHQL_URI,
      credentials: "same-origin",
      headers: {},
      fetch,
    }),
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: !IS_SERVER,
  });
}

export function initApollo(
  initialState: any,
  options: any
): ApolloClient<NormalizedCacheObject> {
  if (IS_SERVER) {
    create(initialState, options);
  }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
