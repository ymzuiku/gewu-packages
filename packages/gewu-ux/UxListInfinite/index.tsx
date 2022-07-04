import { CSSProperties, ReactNode } from "react";
import { DivProps } from "react-override-props";
import { useInfinite } from "../hooks/useInfinite";
import { UxList } from "../UxList";
import { UxLoading } from "../UxLoading";

export type HomeProps = DivProps<{
  className?: string;
}>;

export interface UxListInfiniteProps<T> {
  className?: string;
  style?: CSSProperties;
  pageSize?: number;
  empty?: ReactNode;
  beforeReload?: () => void;
  onChanged?: (items: T[], total: number) => void;
  fetcher: (limit: number, offset: number) => Promise<{ total: number; data: T[] } | undefined>;
  children: (item: T, index: number) => JSX.Element;
  initItem?: T[];
  initTotal?: number;
  topLabel?: (len: number, total: number) => string;
}

export function UxListInfinite<T>({
  children,
  empty,
  pageSize = 10,
  className,
  beforeReload,
  fetcher,
  onChanged,
  initItem = [],
  initTotal,
  topLabel,
  ...rest
}: UxListInfiniteProps<T>) {
  const { isLoading, add, isEnd, items, reload, isEmpty, total } = useInfinite<T>(
    pageSize,
    fetcher,
    initTotal,
    initItem,
  );

  onChanged && onChanged(items, total);

  return (
    <>
      {isLoading && isEmpty && <UxLoading className="mt-10" />}
      {!isLoading && (
        <UxList
          loading={isLoading}
          onReload={async () => {
            if (beforeReload) {
              await Promise.resolve(beforeReload());
            }
            reload();
          }}
          bottomEnd={isEnd}
          onBottom={add}
          className={["space-y-3 pt-3", className].join(" ")}
          topLabel={topLabel ? topLabel(items.length, total) : ""}
          {...rest}
        >
          <>
            {!isLoading && isEmpty && empty}
            {items.map((item, index: number) => {
              return children(item, index);
            })}
          </>
        </UxList>
      )}
    </>
  );
}
