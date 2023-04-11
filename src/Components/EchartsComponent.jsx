import React, { useEffect, useRef } from "react";
import * as eCharts from "echarts";

function EchartsComponent(props) {
  const data = props.option;
  const eChartsRef = useRef();

  useEffect(() => {
    let option = data;
    eCharts.init(eChartsRef.current).dispose();
    const myChart = eCharts.init(eChartsRef.current);

    myChart.setOption(option);
  });
  return (
    <div
      ref={eChartsRef}
      style={{
        width: 700,
        height: 450,
        margin: 5,
      }}
    ></div>
  );
}

export default EchartsComponent;
