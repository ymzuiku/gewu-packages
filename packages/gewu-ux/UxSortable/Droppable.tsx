import { useDroppable } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  rectSortingStrategy,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSSProperties } from "react";
import { SortableItem } from "./SortableItem";
import { DraggTypes } from "./types";

export interface DroppableProps<T> {
  id: string;
  items: T[];
  strategy?: "rect" | "vertival" | "horizontal";
  render: (props: DraggTypes<T>) => JSX.Element;
  groupClassName?: string;
  groupStyle?: CSSProperties;
  listClassName?: string;
  listStyle?: CSSProperties;
}

const strategySorting = {
  rect: rectSortingStrategy,
  vertival: verticalListSortingStrategy,
  horizontal: horizontalListSortingStrategy,
};

export function Droppable<T extends { id: string }>({
  strategy = "rect",
  id,
  items,
  render,
  groupClassName,
  groupStyle,
  listClassName,
  listStyle,
}: DroppableProps<T>) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <SortableContext id={id} items={items} strategy={strategySorting[strategy]}>
      <div ref={setNodeRef} style={groupStyle} className={groupClassName}>
        {items.map((item) => (
          <SortableItem
            className={listClassName}
            style={listStyle}
            key={item.id}
            id={item.id}
            item={item}
            render={render}
          />
        ))}
      </div>
    </SortableContext>
  );
}
