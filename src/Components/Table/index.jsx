import React, {useEffect, useState} from 'react';
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import columns from "./columns";
function TableChart(props) {
    const {tableValue,tableColumns} = props;
    const [
        selectedItems,
        setSelectedItems
    ] = useState([]);
    const [items, setItems] = useState([])
    const [columnConfig,setColumnConfig] = useState([])
    const [visibleColumn, setVisibleColumn] = useState([])
    useEffect(()=>{
        setItems(tableValue);
        setColumnConfig(columns);
        setVisibleColumn(tableColumns)
    },[props])
    return (
        <Table
            onSelectionChange={({ detail }) =>
                setSelectedItems(detail.selectedItems)
            }
            selectedItems={selectedItems}
            ariaLabels={{
                selectionGroupLabel: "Items selection",
                allItemsSelectionLabel: ({ selectedItems }) =>
                    `${selectedItems.length} ${
                        selectedItems.length === 1 ? "item" : "items"
                    } selected`,
                itemSelectionLabel: ({ selectedItems }, item) => {
                    const isItemSelected = selectedItems.filter(
                        i => i.name === item.name
                    ).length;
                    return `${item.name} is ${
                        isItemSelected ? "" : "not"
                    } selected`;
                }
            }}
            columnDefinitions={columnConfig}
            items={items}
            loadingText="Loading resources"
            resizableColumns
            trackBy="name"
            visibleColumns={visibleColumn}
            empty={
                <Box textAlign="center" color="inherit">
                    <b>No resources</b>
                    <Box
                        padding={{ bottom: "s" }}
                        variant="p"
                        color="inherit"
                    >
                        No resources to display.
                    </Box>
                    {/*<Button>Create resource</Button>*/}
                </Box>
            }
            filter={
                <TextFilter
                    filteringPlaceholder="Find resources"
                    filteringText=""
                />
            }
            // header={
            //     <Header
            //         counter={
            //             selectedItems.length
            //                 ? "(" + selectedItems.length + "/10)"
            //                 : "(10)"
            //         }
            //     >
            //         Table with common features
            //     </Header>
            // }
            pagination={
                <Pagination
                    currentPageIndex={1}
                    pagesCount={2}
                    ariaLabels={{
                        nextPageLabel: "Next page",
                        previousPageLabel: "Previous page",
                        pageLabel: pageNumber =>
                            `Page ${pageNumber} of all pages`
                    }}
                />
            }
            preferences={
                <CollectionPreferences
                    title="Preferences"
                    confirmLabel="Confirm"
                    cancelLabel="Cancel"
                    preferences={{
                        pageSize: 10,
                        contentDisplay: [
                            { id: "variable", visible: true },
                            { id: "value", visible: true },
                            { id: "type", visible: true },
                            { id: "description", visible: true }
                        ]
                    }}
                    pageSizePreference={{
                        title: "Page size",
                        options: [
                            { value: 10, label: "10 resources" },
                            { value: 20, label: "20 resources" }
                        ]
                    }}
                    wrapLinesPreference={{
                        label: "Wrap lines",
                        description:
                            "Select to see all the text and wrap the lines"
                    }}
                    stripedRowsPreference={{
                        label: "Striped rows",
                        description:
                            "Select to add alternating shaded rows"
                    }}
                    contentDensityPreference={{
                        label: "Compact mode",
                        description:
                            "Select to display content in a denser, more compact mode"
                    }}
                    contentDisplayPreference={{
                        title: "Column preferences",
                        description:
                            "Customize the columns visibility and order.",
                        liveAnnouncementDndStarted: (
                            position,
                            total
                        ) =>
                            `Picked up item at position ${position} of ${total}`,
                        liveAnnouncementDndDiscarded:
                            "Reordering canceled",
                        liveAnnouncementDndItemReordered: (
                            initialPosition,
                            currentPosition,
                            total
                        ) =>
                            initialPosition === currentPosition
                                ? `Moving item back to position ${currentPosition} of ${total}`
                                : `Moving item to position ${currentPosition} of ${total}`,
                        liveAnnouncementDndItemCommitted: (
                            initialPosition,
                            finalPosition,
                            total
                        ) =>
                            initialPosition === finalPosition
                                ? `Item moved back to its original position ${initialPosition} of ${total}`
                                : `Item moved from position ${initialPosition} to position ${finalPosition} of ${total}`,
                        dragHandleAriaDescription:
                            "Use Space or Enter to activate drag for an item, then use the arrow keys to move the item's position. To complete the position move, use Space or Enter, or to discard the move, use Escape.",
                        dragHandleAriaLabel: "Drag handle",
                        options: [
                            {
                                id: "variable",
                                label: "Variable name",
                                alwaysVisible: true
                            },
                            { id: "value", label: "Text value" },
                            { id: "type", label: "Type" },
                            { id: "description", label: "Description" }
                        ]
                    }}
                />
            }
        />
    );
}

export default React.memo(TableChart);