import * as React from "react";
import BoardItem from "@cloudscape-design/board-components/board-item";
import Header from "@cloudscape-design/components/header";
import Board from "@cloudscape-design/board-components/board";
import { Button } from "@cloudscape-design/components";
import Filter from "./Filter";

export default function DashboardComponent() {
  const [items, setItems] = React.useState([
    {
      id: "3",
      rowSpan: 4,
      columnSpan: 2,
      data: {
        title: "Demo 3",
        content: (""
        ),
      },
    },
    {
      id: "4",
      rowSpan: 4,
      columnSpan: 2,
      data: {
        title: "Demo 4",
        content: (
            ""
        ),
      },
    },
  ]);
  const dosomething = (event) => {
    console.log(event, event.detail.items);
    setItems(event.detail.items);
  };
  return (
    <Board
      renderItem={(item) => (
        <BoardItem
          header={<Header>{item.data.title}</Header>}
          i18nStrings={{
            dragHandleAriaLabel: "Drag handle",
            dragHandleAriaDescription:
              "Use Space or Enter to activate drag, arrow keys to move, Space or Enter to submit, or Escape to discard.",
            resizeHandleAriaLabel: "Resize handle",
            resizeHandleAriaDescription:
              "Use Space or Enter to activate resize, arrow keys to move, Space or Enter to submit, or Escape to discard.",
          }}
        >
          {item.data.content}
          {/* {renderButton()} */}
        </BoardItem>
      )}
      onItemsChange={(event) =>
        //  setItems(event.detail.items)
        dosomething(event)
      }
      items={items}
      i18nStrings={(() => {
        function createAnnouncement(
          operationAnnouncement,
          conflicts,
          disturbed
        ) {
          const conflictsAnnouncement =
            conflicts.length > 0
              ? `Conflicts with ${conflicts
                  .map((c) => c.data.title)
                  .join(", ")}.`
              : "";
          const disturbedAnnouncement =
            disturbed.length > 0 ? `Disturbed ${disturbed.length} items.` : "";
          return [
            operationAnnouncement,
            conflictsAnnouncement,
            disturbedAnnouncement,
          ]
            .filter(Boolean)
            .join(" ");
        }
        return {
          liveAnnouncementDndStarted: (operationType) =>
            operationType === "resize" ? "Resizing" : "Dragging",
          liveAnnouncementDndItemReordered: (operation) => {
            const columns = `column ${operation.placement.x + 1}`;
            const rows = `row ${operation.placement.y + 1}`;
            return createAnnouncement(
              `Item moved to ${
                operation.direction === "horizontal" ? columns : rows
              }.`,
              operation.conflicts,
              operation.disturbed
            );
          },
          liveAnnouncementDndItemResized: (operation) => {
            const columnsConstraint = operation.isMinimalColumnsReached
              ? " (minimal)"
              : "";
            const rowsConstraint = operation.isMinimalRowsReached
              ? " (minimal)"
              : "";
            const sizeAnnouncement =
              operation.direction === "horizontal"
                ? `columns ${operation.placement.width}${columnsConstraint}`
                : `rows ${operation.placement.height}${rowsConstraint}`;
            return createAnnouncement(
              `Item resized to ${sizeAnnouncement}.`,
              operation.conflicts,
              operation.disturbed
            );
          },
          liveAnnouncementDndItemInserted: (operation) => {
            const columns = `column ${operation.placement.x + 1}`;
            const rows = `row ${operation.placement.y + 1}`;
            return createAnnouncement(
              `Item inserted to ${columns}, ${rows}.`,
              operation.conflicts,
              operation.disturbed
            );
          },
          liveAnnouncementDndCommitted: (operationType) =>
            `${operationType} committed`,
          liveAnnouncementDndDiscarded: (operationType) =>
            `${operationType} discarded`,
          liveAnnouncementItemRemoved: (op) =>
            createAnnouncement(
              `Removed item ${op.item.data.title}.`,
              [],
              op.disturbed
            ),
          navigationAriaLabel: "Board navigation",
          navigationAriaDescription:
            "Click on non-empty item to move focus over",
          navigationItemAriaLabel: (item) => (item ? item.data.title : "Empty"),
        };
      })()}
    />
  );
}
