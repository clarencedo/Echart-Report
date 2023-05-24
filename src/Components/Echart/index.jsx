import React, {useEffect, useState} from 'react';
import Tabs from "@cloudscape-design/components/tabs";
import Button from "@cloudscape-design/components/button";
import TableChart from "../Table";
import DemoTable from "./demo-table";
import {useFetcher} from "react-router-dom";
import EchartsBoardItemComponent from "../EchartsBoardItemComponent";
import useSelectedTabStore from "../../Store/SelectedTabStore";
const ChartManagement = (props) => {
    const {tabValue,optionSet,tableValue} = props;
    const [tabs,setTabs] = useState([tabValue])
    const TabIdStore = useSelectedTabStore();
    const [boardOptions, setBoardOptions] = useState([])
    const {tabId, setId} = TabIdStore;
    let id =0;
    const renderContent = (param)=>{
        let value = optionSet.filter((val)=>{
            if(val.tab === param){
                return val;
            }
        });
        // setBoardOptions(value)
        if(optionSet.length >=1){
            return(
            <EchartsBoardItemComponent
                optionSet={value}
                tableValue={tableValue}
                deleteId={id => onChartDelete(id)}
            />
            )
        }else{
            return <div></div>
        }
    }
    const onChartDelete = (id) =>{
        // let val = []
        // optionSet.forEach( (item)=>{
        //     if(item.id !== id){
        //         val.push(item)
        //     }
        // })
        props.deleteHandler(id);
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
