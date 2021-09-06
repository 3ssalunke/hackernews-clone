import type { NextPage } from "next";
import { NewsFeed } from "../src/components/news-feed";
import { MainLayout } from "../src/layout/main-layout";

const Home: NextPage = () => {
  return (
    <MainLayout>
      <NewsFeed />
    </MainLayout>
  );
};

export default Home;
