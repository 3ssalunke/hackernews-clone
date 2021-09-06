import Head from "next/head";

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
      <table>
        <tbody>
          <tr></tr>
          {children}
        </tbody>
      </table>
    </div>
  );
}
