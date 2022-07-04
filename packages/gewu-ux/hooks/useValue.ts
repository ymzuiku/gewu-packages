import { useEffect, useMemo, useState } from "react";

export function useValue<T>(initValue: T, value?: T): [T, React.Dispatch<React.SetStateAction<T>>, boolean] {
  const [selfValue, setSelfValue] = useState(initValue);
  const isControlledComponent = useMemo(() => value !== void 0, [value]);
  useEffect(() => {
    if (isControlledComponent) {
      setSelfValue(value || initValue);
    }
  }, [value]);

  return [selfValue, setSelfValue, isControlledComponent];
}
