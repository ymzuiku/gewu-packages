import { DivProps } from "react-override-props";

export function UxTitle({ className, ...rest }: DivProps<{ name?: string }>) {
  return <h2 className={["p-4 pb-0 font-bold", className].join(" ")} {...rest}></h2>;
}

export function UxSubhead({ className, ...rest }: DivProps<{ name?: string }>) {
  return <h2 className={["text-info text-sm font-bold", className].join(" ")} {...rest}></h2>;
}
