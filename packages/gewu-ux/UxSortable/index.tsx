import {
  DndContext,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { isPhone } from "gewu-utils/device";
import { CSSProperties, useState } from "react";
import { useValue } from "../hooks/useValue";
import { Droppable } from "./Droppable";
import { SortableItem } from "./SortableItem";
import { DraggTypes } from "./types";

function UpdateGroup(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any,
  overContainer: string,
  overIndex: number,
  activeContainer: string,
  activeIndex: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  if (!overContainer || !activeContainer) {
    return items;
  }
  const next = items[activeContainer][activeIndex];
  const old = items[overContainer][overIndex];
  items[activeContainer][activeIndex] = old;
  items[overContainer][overIndex] = next;
  items[activeContainer] = [...items[activeContainer]];
  items[overContainer] = [...items[overContainer]];

  return { ...items };
}

interface UxSortableProps<T> {
  data: Record<string, T[]>;
  onChange?: (items: Record<string, T[]>) => void;
  children: (props: DraggTypes<T>) => JSX.Element;
  strategy?: "rect" | "vertival" | "horizontal";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  groupClassName?: string;
  groupStyle?: CSSProperties;
  listClassName?: string;
  listStyle?: CSSProperties;
}

export function UxSortable<T extends { id: string }>({
  data,
  children,
  strategy,
  onChange,
  groupClassName,
  groupStyle,
  listClassName,
  listStyle,
}: UxSortableProps<T>) {
  const [activeItem, setActiveItem] = useState<T | null>(null);
  const [items, setItems] = useValue(data, data);
  const sensors = useSensors(
    isPhone()
      ? useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
      : useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 10,
        tolerance: 5,
      },
    }),
  );

  function findContainer(id: string): [string, number] {
    let groupKey = "";
    let listIndex = 0;
    const keys = Object.keys(items);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const item = items[key];
      for (let u = 0; u < item.length; u++) {
        const v = item[u];
        if (v.id == id) {
          groupKey = key;
          listIndex = u;
          break;
        }
      }
      // listIndex = item.length - 1;
    }
    return [groupKey, listIndex];
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const { id } = active;

    const [overContainer, overIndex] = findContainer(id as string);

    setActiveItem(items[overContainer][overIndex]);
  }

  const handleDragOver = ({ over, active }: DragOverEvent) => {
    if (!over || !over.id || !active || !active.id) {
      return;
    }
    const overId = over?.id;
    if (!overId) {
      return;
    }

    const [overContainer, overIndex] = findContainer(over.id as string);
    const [activeContainer, activeIndex] = findContainer(active.id as string);

    if (activeContainer !== overContainer) {
      setItems((prev) => {
        const nextItems = UpdateGroup(prev, overContainer, overIndex, activeContainer, activeIndex);
        if (onChange) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onChange(nextItems);
        }
        return nextItems;
      });
    }
  };

  const handleDragEnd = ({ active, over }: DragOverEvent) => {
    if (!over || !over.id || !active || !active.id) {
      return;
    }
    if (active.id !== over.id) {
      const [overContainer, overIndex] = findContainer(over.id as string);
      const [activeContainer, activeIndex] = findContainer(active.id as string);

      setItems((prev) => {
        const nextItems = UpdateGroup(prev, overContainer, overIndex, activeContainer, activeIndex);
        if (onChange) {
          onChange(nextItems);
        }
        return nextItems;
      });
    }
    setActiveItem(null);
  };

  const itemKeys = Object.keys(items);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      {itemKeys.map((groupKey) => {
        return (
          <Droppable
            strategy={itemKeys.length > 1 ? "rect" : strategy}
            key={groupKey}
            id={groupKey}
            render={children}
            items={items[groupKey]}
            groupClassName={groupClassName}
            groupStyle={groupStyle}
            listClassName={listClassName}
            listStyle={listStyle}
          />
        );
      })}
      <DragOverlay>
        {activeItem && (
          <SortableItem isOverlay isSorting={true} render={children} item={activeItem} id={activeItem.id} />
        )}
      </DragOverlay>
    </DndContext>
  );
}
