import * as React from "react";
import Table from "@cloudscape-design/components/table";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import ChartManagement from "./index";

const DemoTable = () => {
    const [
        selectedItems,
        setSelectedItems
    ] = React.useState([{ name: "Item 2" }]);
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
            columnDefinitions={[
                {
                    id: "variable",
                    header: "Variable name",
                    cell: e => e.name,
                    sortingField: "name",
                    isRowHeader: true
                },
                {
                    id: "value",
                    header: "Text value",
                    cell: e => e.alt,
                    sortingField: "alt"
                },
                { id: "type", header: "Type", cell: e => e.type },
                {
                    id: "description",
                    header: "Description",
                    cell: e => e.description
                }
            ]}
            items={[
                {
                    name: "Item 1",
                    alt: "First",
                    description: "This is the first item",
                    type: "1A",
                    size: "Small"
                },
                {
                    name: "Item 2",
                    alt: "Second",
                    description: "This is the second item",
                    type: "1B",
                    size: "Large"
                },
                {
                    name: "Item 3",
                    alt: "Third",
                    description: "-",
                    type: "1A",
                    size: "Large"
                },
                {
                    name: "Item 4",
                    alt: "Fourth",
                    description: "This is the fourth item",
                    type: "2A",
                    size: "Small"
                },
                {
                    name: "Item 5",
                    alt: "-",
                    description:
                        "This is the fifth item with a longer description",
                    type: "2A",
                    size: "Large"
                },
                {
                    name: "Item 6",
                    alt: "Sixth",
                    description: "This is the sixth item",
                    type: "1A",
                    size: "Small"
                }
            ]}
            loadingText="Loading resources"
            selectionType="multi"
            trackBy="name"
            visibleColumns={[
                "variable",
                "value",
                "type",
                "description"
            ]}
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
                    <Button>Create resource</Button>
                </Box>
            }
            filter={
                <TextFilter
                    filteringPlaceholder="Find resources"
                    filteringText=""
                />
            }
            header={
                <Header
                    counter={
                        selectedItems.length
                            ? "(" + selectedItems.length + "/10)"
                            : "(10)"
                    }
                >
                    Table with common features
                </Header>
            }
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

export default DemoTable;