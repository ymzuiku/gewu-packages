import { useRef } from "react";

export function useFormChange<T extends HTMLElement>(): [
  React.RefObject<T & Record<string, unknown>>,
  (name: string, val: unknown) => void,
] {
  const ref = useRef<T & Record<string, unknown>>(null);
  const onChanged = (name: string, val: unknown) => {
    if (ref.current) {
      const group = ref.current.closest(`[data-group="group"]`);
      if (group) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (group as any).onChanged(name, val);
      } else {
        // 非 group，使用每个自己的name
        const form = ref.current.closest("form");
        if (form && form._formOnInput) {
          form._formOnInput(name, val);
        }
      }
    }
  };
  return [ref, onChanged];
}
