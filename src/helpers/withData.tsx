import React from "react";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { initApollo } from "./init-apollo";

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

export function withData<TProps extends IWithDataProps>(
  ComposedComponent: TComposedComponent<TProps & any>
): React.ComponentType<IWithDataProps> {
  return class WithData extends React.Component<IWithDataProps> {
    private apollo: ApolloClient<NormalizedCacheObject> = initApollo(
      this.props.serverState.apollo.data,
      { getToken: () => {} }
    );

    static async getInitialProps(
      context: any
    ): Promise<{ serverState } | void> {
      let serverState: IWithDataServerState = { apollo: { data: {} } };
    }
  };
}
