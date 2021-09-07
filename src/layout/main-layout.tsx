import Head from "next/head";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

interface IMainLayoutProps {
  children: React.ReactChild;
}

export function MainLayout(props: IMainLayoutProps): JSX.Element {
  const { children } = props;
  return (
    <div>
      <Head>
        <title>Hacker News Clone</title>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" type="text/css" href="/static/news.css" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
      </Head>
      <table
        id="hnmain"
        style={{
          backgroundColor: "#f6f6ef",
          border: "0px",
          borderCollapse: "collapse",
          borderSpacing: "0px",
          marginLeft: "auto",
          marginRight: "auto",
          padding: "0px",
          width: "85%",
        }}
      >
        <tbody>
          <Header />
          <tr></tr>
          {children}
          <Footer />
        </tbody>
      </table>
    </div>
  );
}
