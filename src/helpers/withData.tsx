import React from "react";
import cookie from "cookie";
import { getDataFromTree } from "@apollo/client/react/ssr";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { initApollo } from "./init-apollo";
import { IS_SERVER } from "../config";
import { withRouter } from "next/router";

export interface IWithDataServerState {
  apollo: { data: any };
}

export interface IWithDataContext<Q = any> {
  query: Q;
  pathname: string;
}

export interface IWithDataProps<Q = any> {
  serverState: IWithDataServerState;
  dataContext: IWithDataContext<Q>;
}

export type TComposedComponent<Props> = React.ComponentType<Props> & {
  getInitialProps: (context: any, apollo: any) => any;
};

function parseCookies(ctx: any = {}, options = {}): { [key: string]: string } {
  const userCookie = cookie.parse(
    ctx.req && ctx.req.headers.cookie ? ctx.req.headers.cookie : "",
    options
  );
  console.log("Parsing cookie: ", userCookie);
  return userCookie;
}

export function withData<TProps extends IWithDataProps>(
  ComposedComponent: TComposedComponent<TProps & any>
): React.ComponentType<IWithDataProps> {
  return class WithData extends React.Component<IWithDataProps> {
    private apollo: ApolloClient<NormalizedCacheObject> = initApollo(
      this.props.serverState.apollo.data,
      { getToken: () => parseCookies() }
    );

    static displayName = `WithData(${ComposedComponent.displayName})`;

    static async getInitialProps(
      context: any
    ): Promise<{ serverState } | void> {
      let serverState: IWithDataServerState = { apollo: { data: {} } };

      // console.log("getInitialProps with context", context);
      const apollo = initApollo({}, { getToken: () => parseCookies(context) });

      const childInitialProps = ComposedComponent.getInitialProps
        ? await ComposedComponent.getInitialProps(context, apollo)
        : {};

      if (IS_SERVER) {
        if (context.res && context.res.finished) {
          return undefined;
        }

        const router: IWithDataContext = {
          query: context.query,
          pathname: context.pathname,
        };

        const app = (
          <ApolloProvider client={apollo}>
            <ComposedComponent router={router} {...childInitialProps} />
          </ApolloProvider>
        );

        await getDataFromTree(app, {
          router: {
            query: context.query,
            pathname: context.pathname,
            asPath: context.asPath,
          },
        });

        serverState = {
          apollo: {
            data: apollo.cache.extract(),
          },
        };
      }

      return {
        serverState,
        ...childInitialProps,
      };
    }

    render(): JSX.Element {
      return (
        <ApolloProvider client={this.apollo}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
}

const compose =
  (...functions) =>
  (args) =>
    functions.reduceRight((arg, fn) => fn(arg), args);
export const withDataAndRouter = compose(withRouter, withData);
