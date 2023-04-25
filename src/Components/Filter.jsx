import React from "react";
import {Multiselect, Container, Input} from "@cloudscape-design/components";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import RadioGroup from "@cloudscape-design/components/radio-group";
import {
  ColumnLayout,
  Header,
  ExpandableSection,
  Select,
} from "@cloudscape-design/components";
import {useNavigate} from "react-router-dom";
export default function Filter({ value, sendValueToFather, saveOption, visible }) {
  const [radiovalue, setRadioValue] = React.useState("pie");
  const [title, setTitle] = React.useState();
  const navigate = useNavigate()
  const [selectedOptions, setSelectedOptions] = React.useState([
    // {
    //   label: "Option 1",
    //   value: "1",
    // }
  ]);
  const [selectedxAxisOption, setSelectedxAxisOption] = React.useState(null);
  const [selectedyAxisOption, setSelectedyAxisOption] = React.useState(null);
  const selecteOptions = value;
  const sendValue = () => {
    const selection = {
      filed: selectedOptions,
      type: radiovalue,
      x: selectedxAxisOption ? selectedxAxisOption : selectedOptions[0],
      y: selectedyAxisOption ? selectedyAxisOption : selectedOptions[1],
    };
    sendValueToFather(selection);
  };
  const saveOptions = () =>{
    console.log("son");
    saveOption(title);
  }
  const back = () =>{
      navigate("/")
  }

  const clear = () =>{
    setSelectedOptions([]);
    setRadioValue('');
  }

  return (
    <Container header={<Header variant="h2">Echarts Selection</Header>}>
      <ColumnLayout columns={3} variant="text-grid">
        <SpaceBetween size="s">
          <Multiselect
            selectedOptions={selectedOptions}
            onChange={({ detail }) =>
              setSelectedOptions(detail.selectedOptions)
            }
            deselectAriaLabel={(e) => `Remove ${e.label}`}
            options={selecteOptions}
            placeholder="Choose options"
            selectedAriaLabel="Selected"
          />
          <ExpandableSection headerText="Select X-Axis & Dimension Field">
            <Select
              selectedOption={selectedxAxisOption}
              onChange={({ detail }) =>
                setSelectedxAxisOption(detail.selectedOption)
              }
              options={selectedOptions}
              loadingText="Loading instances"
              placeholder="Choose A X-Axis Field Name"
              selectedAriaLabel="Selected"
              statusType="loading"
            />
            <Select
              selectedOption={selectedyAxisOption}
              onChange={({ detail }) =>
                setSelectedyAxisOption(detail.selectedOption)
              }
              options={selectedOptions}
              loadingText="Loading instances"
              placeholder="Choose A Dimension Field Name"
              selectedAriaLabel="Selected"
              statusType="loading"
            />
          </ExpandableSection>
        </SpaceBetween>
        <SpaceBetween size="s">
          <RadioGroup
            onChange={({ detail }) => setRadioValue(detail.value)}
            value={radiovalue}

            items={[
              { value: "pie", label: "Pie" },
              { value: "line", label: "Line" },
              { value: "bar", label: "Bar" },
              { value: "scatter", label: "Scatter" },
            ]}
          />
          <Input value={title}  placeholder="Input Title" onChange={({detail}) => setTitle(detail.value)}/>
        </SpaceBetween>
        <SpaceBetween size="s">
          <Button onClick={clear}>Clear Selection</Button>
          <Button onClick={back}>
            Back
          </Button
       >
          <Button variant="primary" onClick={sendValue} >
            Generate Report
          </Button>
          <Button variant="primary" onClick={saveOptions} >
            Save Report
          </Button>
        </SpaceBetween>
      </ColumnLayout>
    </Container>
  );
}
