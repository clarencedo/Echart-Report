import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";
import "./App.css";
import appSyncConfig from "./aws-exports";
import Home from "./Components/Home";
import "@cloudscape-design/global-styles/index.css";
import DashboardComponent from "./Components/DashboardComponent";
import MainComponent from "./Components/MainComponent";
function App() {
  const url = appSyncConfig.aws_appsync_graphqlEndpoint;

  const region = appSyncConfig.aws_appsync_region;

  const auth = {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
    // credentials: async () => credentials, // Required when you use IAM-based auth.
  };

  const httpLink = new HttpLink({ uri: url });

  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div>
        {/* <DashboardComponent/> */}
        {/* <MainComponent/> */}
        <Home/>
      </div>
    </ApolloProvider>
  );
}

export default App;
