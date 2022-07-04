import { DivProps } from "react-override-props";
import { ListChildComponentProps, ListOnScrollProps, VariableSizeList } from "react-window";
import { useRect } from "../hooks/useRect";

export interface UxWindowScrollProps {
  scrollDirection: "backward" | "forward";
  scrollOffset: number;
  scrollUpdateWasRequested: boolean;
}

export type UxWindowRectProps = DivProps<{
  count: number;
  rectTimeout?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: any;
  initialScrollOffset?: number;
  size: (index: number) => number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onScroll?: (props: ListOnScrollProps) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (item: ListChildComponentProps<any>) => any;
}>;

export function UxWindowRect({
  initialScrollOffset,
  onScroll,
  innerRef,
  className,
  rectTimeout,
  count,
  size,
  children,
  ...rest
}: UxWindowRectProps) {
  const [ref, rect] = useRect<HTMLDivElement>(rectTimeout);
  return (
    <div ref={ref} className={[className].join(" ")} {...rest}>
      {rect && rect.height ? (
        <VariableSizeList
          useIsScrolling
          initialScrollOffset={initialScrollOffset}
          ref={innerRef}
          onScroll={onScroll}
          itemSize={size}
          itemCount={count}
          height={rect.height}
          width="100%"
        >
          {children}
        </VariableSizeList>
      ) : null}
    </div>
  );
}
