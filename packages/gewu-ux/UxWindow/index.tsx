import { throttleArgsWithKey } from "gewu-utils/times";
import { useEffect, useMemo, useRef, useState } from "react";
import { ListChildComponentProps, ListOnScrollProps } from "react-window";
import { UxScrollTopFloat } from "./UxScrollTopFloat";
import { UxWindowRect, UxWindowScrollProps } from "./UxWindowRect";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UxWindowListFetcher = (offset: number, reload: boolean) => void;
export type UxWindowListRender = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: ListChildComponentProps<any> & {
    total: number;
    first: boolean;
    loading: boolean;
    offset: number;
    scrollTo: (top: number, specify: "center" | "start" | "end") => void;
    fetcher: UxWindowListFetcher;
  },
) => JSX.Element;

export type UxWindowMethodRef = {
  fetcher?: UxWindowListFetcher;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItem?: (item: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setItemByIndex?: (index: number, item: any) => void;
  scrollTo?: (top: number, specify: "center" | "start" | "end") => void;
};

export interface UxWindowProps {
  className?: string;
  limit: number;
  rectTimeout?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialScrollOffset?: number;
  height?: number | string;
  methodRef?: { current: UxWindowMethodRef };
  showScrollTop?: boolean;
  floatScrollTop?: number;
  idKey?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onScroll?: (props: ListOnScrollProps) => any;
  renderEmpty?: UxWindowListRender;
  renderLayout?: UxWindowListRender;
  size: (i: number, total: number) => number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetcher: (offset: number, reload: boolean, ...any: any[]) => Promise<{ total: number; data: any[] } | undefined>;
  children: UxWindowListRender;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

export const maxWindowLine = 50000;

const scrollBigOffsetCache = {} as Record<string, number>;
const scrollTopCache = {} as Record<string, number>;

export function UxWindow({
  className,
  children,
  showScrollTop: useShowScrollTop,
  idKey = "id",
  size,
  limit,
  floatScrollTop = 20,
  onScroll,
  height,
  rectTimeout,
  fetcher,
  initialScrollOffset,
  methodRef,
  renderEmpty,
  ...rest
}: UxWindowProps) {
  const key = useMemo(() => fetcher.toString(), []);
  // const ob = useCreateObserver({ showScrollTop: false, scrollIndex: 0 }, []);
  const [showScrollTop, setShowScrollTop] = useState(false);
  // const [scrollIndex, setScrollIndex] = useState(0);
  const cache = useRef({
    isAutoScroll: false,
    href: window.location.href,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [items, setItems] = useState<Record<number, any>>({});
  const idsMap = useRef<Record<string, number>>({});
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const windowRef = useRef<any>();
  const [bigOffset, setBigOffset] = useState(0);

  const scrollTo = (top: number, specify: "center" | "start" | "end" = "start") => {
    if (windowRef.current) {
      const theTop = top > total ? total - 1 : top;
      const nextTop = theTop % maxWindowLine;
      if (top >= maxWindowLine) {
        setBigOffset(theTop - nextTop);
      } else {
        setBigOffset(0);
      }
      windowRef.current.scrollToItem(nextTop, specify);
    }
  };

  const handleScroll = (res: UxWindowScrollProps) => {
    onScroll && onScroll(res);
    scrollTopCache[key] = res.scrollOffset;
    if (useShowScrollTop) {
      setShowScrollTop(res.scrollOffset > 150);
    }
  };

  const selfFetcher = throttleArgsWithKey(key, (offset: number, reload: boolean) => {
    if (reload) {
      const len = Object.keys(items).length;
      requestAnimationFrame(() => {
        setItems({});
        setLoading(true);
      });
      if (len > limit) {
        return;
      }
    }
    requestAnimationFrame(() => {
      fetcher(offset, reload).then((res) => {
        const theTotal = res ? res.total : 0;

        const temp = reload ? {} : items;
        if (res && res.data) {
          setTotal(theTotal);

          for (let i = 0; i < res.data.length; i++) {
            const n = offset + i;
            const v = res.data[i];
            temp[n] = v;
            if (v[idKey]) {
              idsMap.current[v[idKey]] = n;
            }
          }
          setItems({ ...temp });
        } else {
          setItems({});
          idsMap.current = {};
        }
        setLoading(false);
      });
    });
  });

  if (methodRef) {
    methodRef.current.fetcher = selfFetcher;
    methodRef.current.scrollTo = scrollTo;
    methodRef.current.setItem = (item) => {
      const id = item[idKey];
      if (id) {
        const n = idsMap.current[id];
        if (n !== void 0) {
          items[n] = item;
          requestAnimationFrame(() => {
            setItems({ ...items });
          });
        }
      }
    };
    methodRef.current.setItemByIndex = (index, item) => {
      items[index] = item;
      requestAnimationFrame(() => {
        setItems({ ...items });
      });
    };
  }

  useEffect(() => {
    selfFetcher(0, false);
  }, []);

  useEffect(() => {
    return () => {
      if (key && window.location.href !== cache.current.href) {
        scrollBigOffsetCache[key] = bigOffset;
      }
    };
  }, [total, bigOffset]);

  useEffect(() => {
    if (!cache.current.isAutoScroll && total > 0) {
      cache.current.isAutoScroll = true;
      const theBigOffset = scrollBigOffsetCache[key];
      if (theBigOffset > 0) {
        setBigOffset(theBigOffset);
      }
    }
  }, [total, cache.current.isAutoScroll]);

  return (
    <div className={[className, "relative h-full"].join(" ")} style={{ height }} {...rest}>
      {renderEmpty && total <= 0 ? (
        <div className="w-full">
          {renderEmpty({
            ...rest,
            index: -1,
            style: {},
            scrollTo,
            first: true,
            offset: -1,
            data: void 0,
            total,
            fetcher: selfFetcher,
            loading,
          })}
        </div>
      ) : null}
      {showScrollTop ? (
        <UxScrollTopFloat
          show={bigOffset > 1 || showScrollTop}
          className="absolute right-4 z-10"
          style={{
            top: floatScrollTop,
          }}
          onClick={() => {
            setShowScrollTop(false);
            scrollTo(0);
          }}
        ></UxScrollTopFloat>
      ) : null}
      {total > 0 ? (
        <UxWindowRect
          rectTimeout={rectTimeout}
          innerRef={windowRef}
          initialScrollOffset={initialScrollOffset || scrollTopCache[key]}
          className="h-full w-full"
          count={total - bigOffset}
          onScroll={handleScroll}
          size={(i) => size(i, total)}
        >
          {({ isScrolling, index, style, ...rest }) => {
            const realIndex = index + bigOffset > total - 1 ? -1 : index + bigOffset;
            const offset = realIndex - (realIndex % limit);
            if (!isScrolling && realIndex > 0 && !items[realIndex]) {
              selfFetcher(offset);
            }
            if (realIndex < 0) {
              return <div style={style} />;
            }

            return children({
              ...rest,
              index: realIndex,
              first: index === 0,
              style,
              scrollTo,
              offset,
              data: items[realIndex],
              total,
              fetcher: selfFetcher,
              loading,
            });
          }}
        </UxWindowRect>
      ) : null}
    </div>
  );
}
