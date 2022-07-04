import { DivProps } from "react-override-props";
import { ThemeType } from "../theme";

export type UxNewTipProps = DivProps<{
  tip?: string | number;
  theme?: ThemeType;
}>;

export function UxNewTip({ tip, theme = "secondary", className, children, ...rest }: UxNewTipProps) {
  return (
    <div className={["relative", className].join(" ")} {...rest}>
      {children}
      <div
        className={[
          "pointer-events-none absolute -right-0 -top-1 flex h-6 w-6 flex-row items-center justify-center rounded-full text-[10px] shadow",
          `bg-${theme} text-front-${theme}`,
        ].join(" ")}
        style={{ display: tip ? "flex" : "none" }}
      >
        {tip}
      </div>
    </div>
  );
}
