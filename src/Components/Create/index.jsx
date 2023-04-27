import React, {useState, useEffect} from "react";
import {gql, useQuery} from "@apollo/client";
import TestQuery from "../../GraphQL/ReportingDashboardQuery";
import Echart from ".././EchartsComponent";
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
} from "@cloudscape-design/components";
import Filter from ".././Filter";
// import * as Rout from "react-router-dom";
import generateOption from "../../Utils/optionHandler";
import TestComponent from ".././TestComponent";
import DashboardComponent from ".././DashboardComponent";
import EchartsBoardItemComponent from "../EchartsBoardItemComponent";
import {useLocation, useParams} from "react-router-dom";

export default function Create({opValue,name}) {
    const [echartoption, setEchartOption] = useState();
    console.log(name,"name")
    let location = useLocation()
    console.log("location",location)
    const {visible} = useParams()
    console.log("create",visible)
    const [echartVisble, setEchartVisible] = useState(false);
    const [options, setOptions] = useState([]);
    const {loading, data, error, client} = useQuery(TestQuery);
    const selectValue = [];
    // const navigate = Rout.useNavigate()
    useEffect(() => {
        console.log(location.state)
        if(location.state)
        {
            setOptions(location.state.ops)
            setEchartVisible(true)
        }
    },[location]);
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

    const getValueFromSon = (param) => {
        generateOption(param, data.ReportingDashboard);
        setEchartVisible(true);
        setEchartOption(generateOption(param, data.ReportingDashboard));
        let ops = generateOption(param, data.ReportingDashboard);
        let id = 1;
        let pre_ops = options;
        //   let newops = [];
        //   newops.push(pre_ops);
        //   newops.push()
        //   setOptions(newops);
        pre_ops.push(ops);
        pre_ops.forEach((val) => {
            val.id = id;
            id++;
        })
        setOptions(pre_ops);
        console.log("trigger", pre_ops);
    };
    const save = (param) => {
        console.log("father")
        localStorage.setItem("title",param);
        localStorage.setItem("op", JSON.stringify(options));
    }
    const renderEchart = () => {
        if (echartVisble) {
            return <Echart option={echartoption}/>;
        } else {
            return <h2 align="center">No Data</h2>;
        }
    };
    const renderBoardItem = () => {
        if (echartVisble ) {
            return <EchartsBoardItemComponent optionSet={options}/>;
        } else {
            return <h2 align="center"></h2>;
        }
    };

    const renderFilter = () =>{
        if (visible === "true") {
            return  <Filter
                value={selectValue}
                sendValueToFather={getValueFromSon.bind(this)}
                saveOption={save.bind(this)}
                visible={visible}
            />
        }
    }
    return (
        <Box>
            <ContentLayout
                header={<Header variant="h1">Freyr Data Report</Header>}
                margin={{top: "l"}}
            >
                <Box>
                    {/*<Filter*/}
                    {/*    value={selectValue}*/}
                    {/*    sendValueToFather={getValueFromSon.bind(this)}*/}
                    {/*    saveOption={save.bind(this)}*/}
                    {/*    visible={visible}*/}
                    {/*/>*/}
                    {renderFilter()}
                </Box>
                <Box margin={{top: "l"}}>
                    {renderBoardItem()}
                </Box>
            </ContentLayout>
        </Box>
    );
}
