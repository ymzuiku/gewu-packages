import { useEffect, useRef, useState } from "react";

export function useInfinite<T>(
  limit: number,
  fetcher: (limit: number, offset: number) => Promise<{ total: number; data: T[] } | undefined>,
  initTotal = -1,
  initItem: T[] = [],
) {
  // const cacheData = infiniteCache[cache!];
  const [isLoading, setLoading] = useState(initItem.length == 0);
  const [items, setItems] = useState<T[]>(initItem);
  const [total, setTotal] = useState(initTotal);
  const offset = useRef(0);
  const isFething = useRef(false);

  const isEmpty = !items || items.length === 0;
  const isEnd = items.length === total;

  const reload = () => {
    if (isFething.current) {
      return;
    }
    if (!isLoading) {
      setItems([]);
      setTotal(-1);
      setLoading(true);
    }
    isFething.current = true;
    fetcher(limit, 0).then((res: { data: T[]; total: number } | undefined) => {
      isFething.current = false;
      offset.current = 0;
      if (res && res.data) {
        const nextAppList = res.data;
        setItems(nextAppList);
      }
      setTotal((res && res.total) || 0);
      setLoading(false);
    });
  };

  const add = () => {
    if (isFething.current || isEnd) {
      return;
    }
    if (!isLoading) {
      setLoading(true);
    }
    offset.current += limit;
    isFething.current = true;
    fetcher(limit, offset.current).then((res: { data: T[]; total: number } | undefined) => {
      isFething.current = false;
      if (res && res.data && res.data.length > 0) {
        const nextAppList = [...items, ...res.data];
        setItems(nextAppList);
      }
      setTotal((res && res.total) || 0);
      setLoading(false);
    });
  };

  useEffect(() => {
    offset.current = initItem.length - (initItem.length % limit) + limit;
    if (initItem.length === 0) {
      reload();
    }
  }, []);

  return {
    total,
    offset: offset.current,
    reload,
    add,
    items,
    isEnd,
    isLoading,
    isEmpty,
  };
}
