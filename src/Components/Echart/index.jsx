import React, {useEffect, useState} from 'react';
import Tabs from "@cloudscape-design/components/tabs";
import Button from "@cloudscape-design/components/button";
import TableChart from "../Table";
import DemoTable from "./demo-table";
import {useFetcher} from "react-router-dom";
import EchartsBoardItemComponent from "../EchartsBoardItemComponent";
const ChartManagement = (props) => {
    const {tabValue,optionSet,tableValue,tableColumns} = props;
    const [tabs,setTabs] = useState([tabValue])
    let id =0;
    const renderContent = ()=>{
        if(optionSet.length >=1){
            return(
            <EchartsBoardItemComponent
                optionSet={optionSet}
                tableValue={tableValue}
                tableColumns={tableColumns} />
            )
        }else{
            return <div>Empty</div>
        }
    }
    useEffect(()=>{
        console.log("tab->useEffect")
        let tabItems= [];
        tabValue.forEach((val)=>{
            tabItems.push({
                label: val,
                id: id+1,
                content: renderContent()
            });
            id++;
        });
       setTabs(tabItems);
    },[optionSet[optionSet.length - 1],tabValue[tabValue.length -1]])
    console.log("tab-info",tabs)
    console.log("tab-options:",optionSet,optionSet.length)
    return (
        <Tabs
            tabs={tabs}
        />
    );
};

export default ChartManagement;
// export default React.memo(ChartManagement);
