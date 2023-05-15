import React, {useEffect, useState} from 'react';
import Tabs from "@cloudscape-design/components/tabs";
import Button from "@cloudscape-design/components/button";
import TableChart from "../Table";
import DemoTable from "./demo-table";
import {useFetcher} from "react-router-dom";
const ChartManagement = (props) => {
    const [tabs,setTabs] = useState([ {
        label: "tab1",
        id: "first",
        content: "da"
    }])
    useEffect(()=>{
        // setTabs(props.tabInfo)
    },[props])
    return (
        <Tabs
            tabs={tabs}
        />
    );
};

export default React.memo(ChartManagement);