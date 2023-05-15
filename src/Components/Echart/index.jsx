import React, {useEffect, useState} from 'react';
import Tabs from "@cloudscape-design/components/tabs";
import Button from "@cloudscape-design/components/button";
import TableChart from "../Table";
import DemoTable from "./demo-table";
import {useFetcher} from "react-router-dom";
import EchartsBoardItemComponent from "../EchartsBoardItemComponent";
const ChartManagement = (props) => {
    const [tabs,setTabs] = useState([])
    const {tabValue,optionSet,tableValue,tableColumns} = props;
    let id =0;
    console.log('tabs',tabValue);
    useEffect(()=>{
        let tabItems= [];
        tabValue.forEach((val)=>{
            tabItems.push({
                label: val,
                id: id+1,
                content:  <EchartsBoardItemComponent
                    optionSet={optionSet}
                    tableValue={tableValue}
                    tableColumns={tableColumns} />
            })
        });
        id++;
        console.log(tabItems);
       setTabs(tabItems);
    },[props])
    return (
        <Tabs
            tabs={tabs}
        />
    );
};

export default React.memo(ChartManagement);