import React from "react";
import {Multiselect, Container, Input, Modal, Box} from "@cloudscape-design/components";
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
const Filter = ({ value, sendValueToFather, saveOption, visible,addTabInCreatePage }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [radiovalue, setRadioValue] = React.useState("pie");
  const [title, setTitle] = React.useState();
  const [tab,setTab] = React.useState('');
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
    if(radiovalue === "table"){
      sendValueToFather(selectedOptions,"table");
      return;
    }
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

  const addTab = () =>{

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
              { value: "table", label: "Table" },
            ]}
          />
          <Input value={title}  placeholder="Input Title" onChange={({detail}) => setTitle(detail.value)}/>
          {/*<Input onChange={({ detail }) => setTab(detail.value)} value={tab}/>*/}
        </SpaceBetween>
        <SpaceBetween size="s">
          <Button onClick={back}>Back</Button>
          <Button onClick={()=>setModalVisible(true)}>Add Tab</Button>
          <Button onClick={clear}>Clear Selection</Button>
          <Modal
              onDismiss={() => setModalVisible(false)}
              visible={modalVisible}
              closeAriaLabel="Close modal"
              footer={
                <Box float="right">
                  <SpaceBetween direction="horizontal" size="l">
                    <Button variant="link" onClick={()=> setModalVisible(false)}>Cancel</Button>
                    <Button variant="primary" onClick={()=> {addTabInCreatePage(tab);setModalVisible(false);}}>Add</Button>
                  </SpaceBetween>
                </Box>
              }
              header="Tab Editor"
          >
            <SpaceBetween direction="horizontal" size ="xs">
              <Input onChange={({ detail }) => setTab(detail.value)} value={tab}/>
            </SpaceBetween>
          </Modal>
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
export default React.memo(Filter)
