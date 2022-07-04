import { useState } from "react";

export function useUpdate(): [number, () => void] {
  const [u, set] = useState(0);
  return [
    u,
    () => {
      set(Date.now());
    },
  ];
}
