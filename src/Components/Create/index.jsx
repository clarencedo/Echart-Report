import React, {useState, useEffect, useRef} from "react";
import {gql, useQuery} from "@apollo/client";
import TestQuery from "../../GraphQL/ReportingDashboardQuery";
import {from, Observable, Rx, of, filter} from "rxjs";
import {
    Box,
    Container,
    Header,
    ContentLayout,
    HelpPanel,
    AppLayout,
    SideNavigation,
    Link,
    Tabs,
} from "@cloudscape-design/components";
import Filter from ".././Filter";
// import * as Rout from "react-router-dom";
import generateOption from "../../Utils/optionHandler";
import DashboardComponent from ".././DashboardComponent";
import EchartsBoardItemComponent from "../EchartsBoardItemComponent";
import {useLocation, useParams} from "react-router-dom";
import ChartManagement from "../Echart";
import {useTabStore} from "../../Store/TabStore";
import useSelectedTabStore from "../../Store/SelectedTabStore";
import useDeletedStore from "../../Store/DeletedStore";

const Create = ({opValue,name})=> {
    const [echartoption, setEchartOption] = useState();
    const chartRef = useRef();
    // console.log(name,"name")
    let location = useLocation()
    // console.log("location",location)
    const {visible} = useParams()
    // console.log("create",visible)
    const [echartVisble, setEchartVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const [tableColumns, setTableColumns] = useState([null]);
    const [tableValue, setTableValue] = useState([]);
    const [tabs,setTabs] = useState(['echarts-tab'])
    const {loading, data, error, client} = useQuery(TestQuery);
    const selectValue = [];
    const TabStore = useTabStore();
    // const {name} = TabStore;
    // const nameInStore = useTabStore((state)=>state.name)
    const nameInStore = TabStore.name;
    const TabIdStore = useSelectedTabStore();
    const {tabId} = TabIdStore;
    let id = 1;
    const {deletedId} = useDeletedStore((state)=> state.deleteId)
    // const navigate = Rout.useNavigate()
    useEffect(() => {
        // console.log(location.state)
        console.log("create-useEffect");
        if(location.state)
        {
            setOptions(location.state.ops)
            setEchartVisible(true)
        }
        setTableValue(data.ReportingDashboard);
        if(deletedId >1){
            onChartDelete(deletedId)
        }
    },[location,options, tabs]);
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;
    let selectedValue = 0;
    for (let item in data.ReportingDashboard[0]) {
        selectValue.push({
            label: item,
            value: selectedValue + 1,
        });
        selectedValue++;
    }

    const getValueFromSon = (param,type) => {
        if(type === "table"){
            const fieldArr = param.map(({label})=>{
                return label;
            })
            setTableColumns(fieldArr)
            return;
        }
        setEchartVisible(true);
        let opt_value = generateOption(param, data.ReportingDashboard,tabId)
        setEchartOption(opt_value);
        // let ops = opt_value;
        let pre_ops = options;
        pre_ops.push(opt_value);
        pre_ops.forEach((val) => {
            val.id = id;
            id++;
        })
        console.log("generate", pre_ops);
        pre_ops = pre_ops.filter((val)=>{
            if(val.id !== deletedId){
                return val
            }
        })
        setOptions(pre_ops);
    };
    const save = (param) => {
        console.log("father")
        localStorage.setItem("title",param);
        localStorage.setItem("op", JSON.stringify(options));
    }
    const renderBoardItem = () => {
        if (echartVisble ) {
            return <EchartsBoardItemComponent
                optionSet={options}
                deleteId={id => onChartDelete(id)}
                tableValue={tableValue}
                tableColumns={tableColumns} />;
        } else {
            return <h2 align="center"></h2>;
        }
    };
    const renderChart = ()=>{
        return <ChartManagement
            optionSet={options}
            tableValue={tableValue}
            tableColumns={tableColumns}
            tabValue={tabs}
        />
    }
    const onChartDelete = (id) =>{
        // const {deleteId} = chartRef.current || {};
        console.log("Shanchu ",id, options);
        let val = []
        options.forEach( (item)=>{
            if(item.id !== id){
                val.push(item);
            }
        })
        console.log("create-options",options)
        setOptions(val);
    }
    const renderFilter = () =>{
        if (visible === "true") {
            return  <Filter
                value={selectValue}
                sendValueToFather={getValueFromSon.bind(this)}
                saveOption={save.bind(this)}
                visible={visible}
                addTabInCreatePage={item => addTabs(item)}
            />
        }
    }
    const addTabs = (item) =>{
        // let newtabs = tabs;
        // newtabs.push(item);
        // setTabs(newtabs);
        console.log("从Filter组件拿到tab的值为,",item)
        console.log("从Store里拿的Tab值为,",nameInStore)
        let newtabs = tabs;
        // newtabs.push(nameInStore);
        newtabs.push(item);
        setTabs(newtabs);
        console.log("receive new tabs->",newtabs);
    }
    return (
        <Box>
            <ContentLayout
                header={<Header variant="h1">Freyr Data Report</Header>}
                margin={{top: "l"}}
            >
                <Box>
                    {renderFilter()}
                </Box>
                <Box margin={{top: "l"}}>
                    {/*{renderBoardItem()}*/}
                    {renderChart()}
                </Box>
            </ContentLayout>
        </Box>
    );
}
export default React.memo(Create)
