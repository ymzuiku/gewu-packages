export interface DraggTypes<T> {
  item: T;
  isDragging: boolean;
  isOver: boolean;
  isSorting: boolean;
  isOverlay?: boolean;
  drag: import("@dnd-kit/core").DraggableAttributes &
    (import("@dnd-kit/core/dist/hooks/utilities").SyntheticListenerMap | undefined);
}
