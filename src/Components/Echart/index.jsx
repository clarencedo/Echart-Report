import React, {useEffect, useState} from 'react';
import Tabs from "@cloudscape-design/components/tabs";
import Button from "@cloudscape-design/components/button";
import TableChart from "../Table";
import DemoTable from "./demo-table";
import {useFetcher} from "react-router-dom";
import EchartsBoardItemComponent from "../EchartsBoardItemComponent";
import useSelectedTabStore from "../../Store/SelectedTabStore";
const ChartManagement = (props) => {
    const {tabValue,optionSet,tableValue,tableColumns} = props;
    const [tabs,setTabs] = useState([tabValue])
    const TabIdStore = useSelectedTabStore();
    const {tabId, setId} = TabIdStore;
    let id =0;
    const renderContent = (param)=>{
        let value = optionSet.filter((val)=>{
            if(val.tab === param){
                return val;
            }
        });
        if(optionSet.length >=1){
            return(
            <EchartsBoardItemComponent
                optionSet={value}
                tableValue={tableValue}
                tableColumns={tableColumns} />
            )
        }else{
            return <div>Empty</div>
        }
    }
    useEffect(()=>{
        let tabItems= [];
        tabValue.forEach((val)=>{
            tabItems.push({
                label: val,
                id: id+1,
                content: renderContent(id+1)
            });
            id++;
        });
       setTabs(tabItems);
    },[optionSet[optionSet.length - 1],tabValue[tabValue.length -1]])
    return (
        <Tabs
            onChange={(e)=>{setId(e.detail.activeTabId)}}
            tabs={tabs}
        />
    );
};

export default ChartManagement;
// export default React.memo(ChartManagement);
