import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import TestQuery from "../GraphQL/ReportingDashboardQuery";
import Echart from "./EchartsComponent";
import { from, Observable, Rx, of, filter } from "rxjs";
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
import Filter from "./Filter";
// import * as Rout from "react-router-dom";
import generateOption from "../Utils/optionHandler";
import TestComponent from "./TestComponent";
import DashboardComponent from "./DashboardComponent";
import EchartsBoardItemComponent from "./EchartsBoardItemComponent";
export default function MainComponent() {
  const [echartoption, setEchartOption] = useState();
  const [echartVisble, setEchartVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const { loading, data, error, client } = useQuery(TestQuery);
  const selectValue = [];
  // const navigate = Rout.useNavigate()
  useEffect(() => {});
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
    pre_ops.forEach((val)=>{
      val.id = id;
      id ++;
    })
    setOptions(pre_ops);
    console.log("trigger", pre_ops);
  };
  const save = () =>{
    console.log("father")
    localStorage.setItem("op",options);
  }
  const renderEchart = () => {
    if (echartVisble) {
      return <Echart option={echartoption} />;
    } else {
      return <h2 align="center">No Data</h2>;
    }
  };
  const renderBoardItem = () => {
    if (echartVisble) {
      return <EchartsBoardItemComponent optionSet={options} />;
    } else {
      return <h2 align="center">No Data</h2>;
    }
  };
  return (
    <Box>
      <AppLayout
      //   navigation={
      //     <SideNavigation
      //       activeHref={window.location.pathname}
      //       items={[{ type: "link", text: "Data Domains", href: "/" }]}
      //       onFollow={async (event) => {
      //         event.preventDefault();
      //       }}
      //     />
      //   }
        content={
          <ContentLayout
            header={<Header variant="h1">Freyr Data Report</Header>}
            margin={{ top: "l" }}
          >
            <Box>
              <Filter
                value={selectValue}
                sendValueToFather={getValueFromSon.bind(this)}
                saveOption={save.bind(this)}
              />
            </Box>
            <Box margin={{ top: "l" }}>
              {/* <Container
                header={
                  <Header variant="h2" description="gengerated by echart.js">
                    Echarts Report
                  </Header>
                }
              >
                {renderBoardItem()}
                <DashboardComponent></DashboardComponent>
              </Container> */}
              {renderBoardItem()}
              {/* <DashboardComponent/> */}
            </Box>
          </ContentLayout>
        }
        tools={
          <HelpPanel
            header={<Header variant="h3">Additional Resources</Header>}
          >
            <h4>Event Information</h4>
            <ul>
              <li>
                Central Account ID: <strong>AccountID</strong>
              </li>
              <li>
                Event Hash: <strong>EventHash</strong>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://catalog.us-east-1.prod.workshops.aws/workshops/23e6326b-58ee-4ab0-9bc7-3c8d730eb851/en-US"
                >
                  Build a Data Mesh Workshop
                </Link>
              </li>
            </ul>
          </HelpPanel>
        }
      />
    </Box>
  );
}
