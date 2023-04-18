import { createAuthLink } from "aws-appsync-auth-link";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";
import React, {useState, useRef, forwardRef} from "react";
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
import CardsComponent from "./Components/CardsComponent";
import {AppLayout, AppLayoutProps, HelpPanel} from "@cloudscape-design/components";
import {Navigation} from "./Common/navigation";
import DetailsCards from "./Components/Dashboard";
import {Breadcrumbs} from "./Components/Dashboard/common-components";
function App() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const appLayout = useRef();
  const url = appSyncConfig.aws_appsync_graphqlEndpoint;

  const region = appSyncConfig.aws_appsync_region;

  const auth = {
    type: appSyncConfig.aws_appsync_authenticationType,
    apiKey: appSyncConfig.aws_appsync_apiKey,
    // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
    // credentials: async () => credentials, // Required when you use IAM-based auth.
  };

  const httpLink = new HttpLink({ uri: url });

  const appLayoutAriaLabels = {
    navigation: 'Side navigation',
    navigationToggle: 'Open side navigation',
    navigationClose: 'Close side navigation',
    notifications: 'Notifications',
    tools: 'Help panel',
    toolsToggle: 'Open help panel',
    toolsClose: 'Close help panel',
  };
  const CustomAppLayout = forwardRef((props, ref) =>{
    return <AppLayout ref={ref} ariaLabels={appLayoutAriaLabels} {...props} />;
  });
  const link = ApolloLink.from([
    createAuthLink({ url, region, auth }),
    createSubscriptionHandshakeLink({ url, region, auth }, httpLink),
  ]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  const ToolsContent = () => (
      <HelpPanel  header={<h2>Distributions</h2>}>
        <p>
          View your current distributions and related information such as the associated domain names, delivery methods, SSL
          certificates, and more. To drill down even further into the details, choose the name of an individual
          distribution.
        </p>
      </HelpPanel>
  );
  return (
      <CustomAppLayout
          ref={appLayout}
          navigation={<Navigation activeHref="#/distributions" />}
          // notifications={<Notifications successNotification={true} />}
          breadcrumbs={<Breadcrumbs />}
          content={
            <DetailsCards
                loadHelpPanelContent={() => {
                  setToolsOpen(true);
                  appLayout.current?.focusToolsClose();
                }}
            />
          }
          contentType="cards"
          tools={<ToolsContent />}
          toolsOpen={toolsOpen}
          onToolsChange={({ detail }) => setToolsOpen(detail.open)}
          stickyNotifications={true}
      />


    // <ApolloProvider client={client}>
    //   <div>
    //      {/*<DashboardComponent/>*/}
    //      {/*<MainComponent/>*/}
    //     {/* <Home/>*/}
    //     {/*<CardsComponent/>*/}
    //   </div>
    // </ApolloProvider>
  );
}

export default App;
