import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";
import { DraggTypes } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function SortableItem<T extends { id: string }>({
  id,
  item,
  className,
  style,
  isSorting,
  isOverlay,
  render: Component,
}: {
  className?: string;
  style?: CSSProperties;
  id: string;
  item: T;
  isSorting?: boolean;
  isOverlay?: boolean;
  render: (props: DraggTypes<T>) => JSX.Element;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
    isSorting: _isSortting,
  } = useSortable({
    id: id,
  });

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    userSelect: "none",
    // cursor: "grab",
    // boxSizing: "border-box",
    touchAction: "manipulation",
    opacity: isDragging ? "0.5" : 1,
    ...style,
  } as CSSProperties;

  const cpm = Component({
    item,
    drag: { ...attributes, ...listeners } as never,
    isDragging,
    isOver,
    isOverlay,
    isSorting: isSorting || _isSortting,
  });

  return (
    <div className={className} style={itemStyle} ref={setNodeRef}>
      {cpm}
    </div>
  );
}
