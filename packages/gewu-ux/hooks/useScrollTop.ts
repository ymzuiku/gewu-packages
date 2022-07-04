import { useEffect, useRef } from "react";

const scrollTopCache = {} as Record<string, number>;
const baseGet = () => window.scrollY;
const baseSet = (top: number) => window.scrollTo({ top });

export function useScrollTop(key: string, get = baseGet, set: typeof baseSet | null = baseSet) {
  const ref = useRef(scrollTopCache[key]);
  useEffect(() => {
    if (set && ref.current) {
      set(ref.current);
    }
    return () => {
      if (key) {
        scrollTopCache[key] = get();
      }
    };
  }, []);
  return ref;
}
