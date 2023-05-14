import React from 'react';
import Tabs from "@cloudscape-design/components/tabs";
import Button from "@cloudscape-design/components/button";
import TableChart from "../Table";
import DemoTable from "./demo-table";
const ChartManagement = () => {
    return (
        <Tabs
            tabs={[
                {
                    label: "First tab label",
                    id: "first",
                    content: <DemoTable/>
                },
                {
                    label: "Second tab label",
                    id: "second",
                    content: "Second tab content area"
                },
                {
                    label: "Third tab label",
                    id: "third",
                    content: "",
                }
            ]}

        />
    );
};

export default ChartManagement;