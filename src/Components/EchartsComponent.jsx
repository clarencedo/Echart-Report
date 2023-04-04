import React, { useEffect, useRef } from 'react'
import * as eCharts from 'echarts';

function EchartsComponentDemo(props) {
  const data = props.option;
  const eChartsRef = useRef();

  useEffect(()=>{
    let option = data;
    eCharts.init(eChartsRef.current).dispose();
    const myChart = eCharts.init(eChartsRef.current);
   
    myChart.setOption(option);
  })
  return (
    <div ref={eChartsRef} 
    style={{
      width: 1800,
      height: 500,
      margin: 100
    }}
    >
    </div>
  );
}

export default  EchartsComponentDemo;
