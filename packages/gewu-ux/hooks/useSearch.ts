import { gewuRoute } from "gewu-route";
import { useMemo } from "react";

export function useHashSearch(...keys: string[]) {
  const params = useMemo(() => {
    const search = gewuRoute.hashSearch();
    return keys.map((key) => search.get(key) || "");
  }, keys);

  return params;
}

export function useSearch(...keys: string[]) {
  const params = useMemo(() => {
    const search = gewuRoute.search();
    return keys.map((key) => search.get(key) || "");
  }, keys);

  return params;
}
