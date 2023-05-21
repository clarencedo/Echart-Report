
function generateOption(param, data,id) {
  const xkey = param.x.label; 
  const ykey = param.y.label;
  const xmap = new Map();
  const xset = new Set();
  const ymap = new Map();
  const yset = new Set();
  const hybridSet = new Set();
  const hybridMap = new Map();
  let option = {
    legend: {},
    tooltip: {},
    dataset: {
      source: [],
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: [],
    tab: id,
  };
  data.map((item)=>{
     let XKey ="";
     Object.getOwnPropertyNames(item).forEach(function(val, idx, array) {
      if(val === xkey){
        let xcount =
          xmap.get(item[val]) !== undefined ? xmap.get(item[val]) : 0
        xset.add(item[val]);
        xmap.set(item[val], xcount+1)
        hybridSet.add(item[val])
        XKey= item[val]
      }

      if(val === ykey){
        let ycount =
          ymap.get(item[val]) !== undefined ? ymap.get(item[val]) : 0
        yset.add(item[val]);
        ymap.set(item[val], ycount+1)

        // const XKey  = [...xset][xset.size - 1 ]
        let hcount = hybridMap.get(XKey+"|"+item[val]) !== undefined ? hybridMap.get(XKey+"|"+item[val]) : 0;
        hybridMap.set(XKey+"|"+item[val],hcount + 1)

      }
    });
  })

  const sourceData = ["product"]
  // }
  yset.forEach((val) => sourceData.push(val))
  option.dataset.source.push(sourceData);

  xmap.forEach((value,index)=>{
    let data = [index];
    yset.forEach((dimension)=>{
      let title = index + "|" + dimension
      let fValue = hybridMap.get(title)
      if(fValue === undefined)
      fValue = 0;
      data.push(fValue)
    })
    option.dataset.source.push(data)
  })

  yset.forEach(()=>{
    option.series.push({type: param.type})
  })
  return option;
}

export default generateOption;