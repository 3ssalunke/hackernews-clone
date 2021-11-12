import Head from "next/head";
import React from "react";

interface IBlankLayoutProps {
  children: React.ReactNode;
}

export function BlankLayout(props: IBlankLayoutProps): JSX.Element {
  const { children } = props;
  return (
    <div className="wordSection1">
      <Head>
        <meta name="referrer" content="origin" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <title>Login & Register</title>
      </Head>
      {children}
    </div>
  );
}
