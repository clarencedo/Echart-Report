import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import Button from "@cloudscape-design/components/button";
import TextFilter from "@cloudscape-design/components/text-filter";
import Header from "@cloudscape-design/components/header";
import Pagination from "@cloudscape-design/components/pagination";
import CollectionPreferences from "@cloudscape-design/components/collection-preferences";
import  ButtonDropdown  from "@cloudscape-design/components/button-dropdown";
export default function CardsComponent() {
  const [selectedItems, setSelectedItems] = React.useState([
    { name: "Item 2" },
  ]);
  return (
    <Cards
      onSelectionChange={({ detail }) => setSelectedItems(detail.selectedItems)}
      selectedItems={selectedItems}
      ariaLabels={{
        itemSelectionLabel: (e, n) => `select ${n.name}`,
        selectionGroupLabel: "Item selection",
      }}
      cardDefinition={{
        header: (item) => item.name,
        sections: [
          {
            id: "image",
            content: () => <div className="card-section-image"></div>,
          },
          {
            id: "description",
            header: "Description",
            content: (item) => (
              <div className="card-section-description">
                <div>{item.description}</div>
                <ButtonDropdown
                  items={[
                    {
                      text: "Delete",
                      id: "rm",
                      disabled: false,
                    },
                    {
                      text: "Move",
                      id: "mv",
                      disabled: false,
                    },
                    {
                      text: "Rename",
                      id: "rn",
                      disabled: true,
                    },
                    {
                      text: "View metrics",
                      href: "https://example.com",
                      external: true,
                      externalIconAriaLabel: "(opens in new tab)",
                    },
                  ]}
                  ariaLabel="Control instance"
                  variant="icon"
                />
              </div>
            ),
          },
          {
            id: "type",
            header: "Type",
            content: (item) => item.type,
            width: 50,
          },
          {
            id: "size",
            header: "Size",
            content: (item) => item.size,
            width: 50,
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
      items={[
        {
          name: "Item 1",
          alt: "First",
          description: "This is the first item",
          type: "1A",
          size: "Small",
        },
        {
          name: "Item 2",
          alt: "Second",
          description: "This is the second item",
          type: "1B",
          size: "Large",
        },
        {
          name: "Item 3",
          alt: "Third",
          description: "This is the third item",
          type: "1A",
          size: "Large",
        },
        {
          name: "Item 4",
          alt: "Fourth",
          description: "This is the fourth item",
          type: "2A",
          size: "Small",
        },
        {
          name: "Item 5",
          alt: "Fifth",
          description: "This is the fifth item",
          type: "2A",
          size: "Large",
        },
        {
          name: "Item 6",
          alt: "Sixth",
          description: "This is the sixth item",
          type: "1A",
          size: "Small",
          content: (<Button>Button</Button>)
        },
      ]}
      loadingText="Loading resources"
      selectionType="multi"
      trackBy="name"
      visibleSections={["image", "description", "type", "size"]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box padding={{ bottom: "s" }} variant="p" color="inherit">
            No resources to display.
          </Box>
          <Button>Create resource</Button>
        </Box>
      }
      filter={<TextFilter filteringPlaceholder="Find resources" />}
      header={
        <Header
          counter={
            selectedItems.length ? "(" + selectedItems.length + "/10)" : "(10)"
          }
        >
          Cards with actions
        </Header>
      }
      pagination={<Pagination currentPageIndex={1} pagesCount={2} />}
      preferences={
        <CollectionPreferences
          title="Preferences"
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          preferences={{
            pageSize: 6,
            visibleContent: ["description", "type", "size"],
          }}
          pageSizePreference={{
            title: "Page size",
            options: [
              { value: 6, label: "6 resources" },
              { value: 12, label: "12 resources" },
            ],
          }}
          visibleContentPreference={{
            title: "Select visible content",
            options: [
              {
                label: "Main distribution properties",
                options: [
                  {
                    id: "description",
                    label: "Description",
                  },
                  { id: "type", label: "Type" },
                  { id: "size", label: "Size" },
                ],
              },
            ],
          }}
        />
      }
    />
  );
}
