import { DivProps } from "react-override-props";

export type UxLineProps = DivProps<{
  border?: string;
}>;

export function UxLine({ className, border = "border-info", ...rest }: UxLineProps) {
  return <div className={["bottom-1px w-full", className, border].join(" ")} {...rest}></div>;
}
