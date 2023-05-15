import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import TestQuery from "../GraphQL/ReportingDashboardQuery";
import Echart from "./Echart/EchartsComponent";
import { from, Observable, Rx, of, filter } from "rxjs";
import {
  Box,
  Container,
  Header,
  ContentLayout,
} from "@cloudscape-design/components";
import Filter from "./Filter";
import generateOption from "../Utils/optionHandler";
function Home() {

  const [echartoption, setEchartOption] = useState();
  const [echartVisble, setEchartVisible] = useState(false);
  const { loading, data, error, client } = useQuery(TestQuery);
  const selectValue = [];
  useEffect(()=>{
    console.log("累死了，真的牛逼")
  })
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
    generateOption(param, data.ReportingDashboard)
    setEchartVisible(true)
    setEchartOption( generateOption(param, data.ReportingDashboard))
  };

  const renderEchart = () => {
    if (echartVisble) {
      return <Echart option={echartoption} />;
    } else {
      return <h2 align="center">No Data</h2>;
    }
  };
  return (
    <Box>
      <ContentLayout header={<Header variant="h1">Freyr Data Report</Header>}>
        <Box>
          <Filter
            value={selectValue}
            sendValueToFather={getValueFromSon.bind(this)}
          />
        </Box>
        <Box margin={{ top: "l" }}>
          <Container
            header={
              <Header variant="h2" description="gengerated by echart.js">
                Echarts Report
              </Header>
            }
          >
            {renderEchart()}
          </Container>
        </Box>
      </ContentLayout>
    </Box>
  );
}

export default Home;
