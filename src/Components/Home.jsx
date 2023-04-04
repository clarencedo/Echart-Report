import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import TestQuery from "../GraphQL/TestQuery";
import Echart from "./EchartsComponent";
import { from, Observable, Rx, of, filter } from "rxjs";
import { map, take } from "rxjs/operators";
import optionHandler from "../Utils/optionHandler";
import index from "../Utils/index"
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
  const jsonKeyName = [];
  const yearSet = new Set();
  const cateSet = new Set();
  const countrySet = new Set();
  const cateMap = new Map();
  const countryMap = new Map();
  const selectValue = [];
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  let selectedValue = 0;
  for (let item in data.ReportingDashboard[0]) {
    jsonKeyName.push(item);
    selectValue.push({
      label: item,
      value: selectedValue + 1,
    });
    selectedValue++;
  }
  // console.log("fields", jsonKeyName);

  console.log("data", data);
  from(data?.ReportingDashboard)
    .pipe(
      map(
        ({
          category_id,
          region,
          created_year,
          category_name,
          country_name,
        }) => {
          // let catekey = category_name + "-" + created_year;
          let catekey = category_name;
          // let countryKey = country_name + "-" + created_year;
          let countryKey = country_name;
          let cateCount =
            cateMap.get(catekey) !== undefined ? cateMap.get(catekey) : 0;
          let countryCount =
            countryMap.get(catekey) !== undefined ? countryMap.get(catekey) : 0;
          //set value
          yearSet.add(created_year);
          cateSet.add(category_name);
          countrySet.add(country_name);
          //count++
          cateMap.set(catekey, cateCount + 1);
          countryMap.set(countryKey, countryCount + 1);
        }
      )
    )
    .subscribe();

  let option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [["product", "2022"]],
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [{ type: "bar" }],
  };
  for (let i of cateMap.keys()) {
    var dataArray = [];
    dataArray.push(i);
    dataArray.push(cateMap.get(i));
    option.dataset.source.push(dataArray);
  }
  const getValueFromSon = (param) => {
    console.log("receive", param);

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
        <Box margin={{ top: "m" }}>
          <Container
            header={
              <Header variant="h2" description="gengerated by echart.js">
                Echarts Report
              </Header>
            }
          >
            {renderEchart()}
            {/* <Echart option={option} /> */}
          </Container>
        </Box>
      </ContentLayout>
    </Box>
  );
}

export default Home;
