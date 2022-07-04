import { useEffect } from "react";
import { Override } from "react-override-props";
import { LoadType, useField } from "./useField";

type FieldHOCProps<T> = Override<
  T,
  {
    name: string;
    loadType?: LoadType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (val: any) => void;
  }
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function FieldHOC<T>(Component: any) {
  return function FieldHOCComponent({ name, loadType, onChange, ...rest }: FieldHOCProps<T>) {
    if (name) {
      const ctx = useField(name, loadType);
      useEffect(() => {
        if (onChange) {
          onChange(ctx.value);
        }
      }, [ctx.value]);
      return <Component {...ctx} {...rest} />;
    }

    return <Component {...rest} />;
  };
}
