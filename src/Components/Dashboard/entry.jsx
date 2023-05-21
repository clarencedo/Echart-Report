import React, {useState, useEffect, useRef, forwardRef} from 'react';
import DataProvider from "./data-provider";
import { CARD_DEFINITIONS, VISIBLE_CONTENT_OPTIONS, PAGE_SIZE_OPTIONS, DEFAULT_PREFERENCES } from "./cards-config";
import {
    Cards,
    CollectionPreferences,
    Pagination,
    Box,
    SpaceBetween,
    Button,
    TextFilter,
    AppLayout,
    Spinner
} from '@cloudscape-design/components';
import FullPageHeader from "./full-page-header";
import { useCollection } from '@cloudscape-design/collection-hooks';
import { PaginationProps, TableProps } from '@cloudscape-design/components';
import {Navigation} from "../../Common/navigation";
import {Breadcrumbs, ToolsContent} from "./common-components";
import DetailsCards from "./index";
import {Route, Routes, useNavigate} from "react-router-dom";
import Create from "../Create";
import {useQuery} from "@apollo/client";
import TestQuery from "../../GraphQL/ReportingDashboardQuery";
import appSyncConfig from "../../aws-exports";
// import {paginationAriaLabels} from "../../i18n-strings/pagination";
const DashBoard = ({loadHelpPanelContent}) => {
    const [toolsOpen, setToolsOpen] = useState(false);
    const appLayout = useRef();
    const [breadcrumbs, setBreadcrumbs] = useState(null);
    const navigate = useNavigate()
    const appLayoutAriaLabels = {
        navigation: 'Side navigation',
        navigationToggle: 'Open side navigation',
        navigationClose: 'Close side navigation',
        notifications: 'Notifications',
        tools: 'Help panel',
        toolsToggle: 'Open help panel',
        toolsClose: 'Close help panel',
    };
    const { loading, data, error, client } = useQuery(TestQuery);
    // if (loading) return "Loading...";
    if (loading) return (
        <p align="center">
            <Spinner style="align:center" size="large" />
        </p>
    );
    if (error) return `Error! ${error.message}`;
    console.log("init-data",data);
    // const url = appSyncConfig.aws_appsync_graphqlEndpoint;
    //
    // const data = fetch(url,{
    //     method: 'POST',
    //     headers: {'x-api-key': 'da2-vdykfyhrqzbbdiwbywb4fdgv64'},
    //     body: JSON.stringify({
    //         'query': TestQuery
    //     })
    // }).then((resp) =>resp.json()).then((data)=>console.log('data',data)).catch((err)=> console.log(err.message))
    const CustomAppLayout = forwardRef((props, ref) =>{
        return <AppLayout ref={ref} ariaLabels={appLayoutAriaLabels} {...props} />;
    });

    return (
        <CustomAppLayout
            ref={appLayout}
            navigation={<Navigation activeHref="#/distributions" />}
            breadcrumbs={breadcrumbs}
            content={
                <Routes>
                    <Route exact path="/" element={<DetailsCards breadcrumbsCallback={setBreadcrumbs} />} />
                    <Route exact path="/create/:visible" element={<Create breadcrumbsCallback={setBreadcrumbs} />} />
                </Routes>
            }
            contentType="cards"
            tools={<ToolsContent />}
            toolsOpen={toolsOpen}
            onToolsChange={({ detail }) => setToolsOpen(detail.open)}
            stickyNotifications={true}
        />
    );
};

export default DashBoard;
