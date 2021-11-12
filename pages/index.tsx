import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { NewsFeed } from "../src/components/news-feed";
import { withDataAndRouter } from "../src/helpers/withData";
import { MainLayout } from "../src/layout/main-layout";
import { FeedType } from "../src/model/feed.model";

const query = gql`
  query topItems($type: FeedType!) {
    feed(feedType: $type) {
      id
      by
      type
      createdAt
    }
  }
`;

export function IndexPage(props): JSX.Element {
  const { router } = props;
  const { data } = useQuery(query, { variables: { type: FeedType.TOP } });

  return (
    <MainLayout currentUrl={router.pathname}>
      <NewsFeed />
    </MainLayout>
  );
}

export default withDataAndRouter(IndexPage);
