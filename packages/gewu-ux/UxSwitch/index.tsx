import { DivProps } from "react-override-props";
import { ThemeType } from "../theme";

export type UxSwitchProps = DivProps<{
  value?: boolean;
  className?: string;
  name?: string;
  disabled?: boolean;
  theme?: ThemeType;
  size?: string;
  rotate?: boolean;
  rounded?: string;
  childrenInLeft?: boolean;
  onChange?: (selected: boolean) => void;
}>;

export function UxSwitch({
  value,
  className,
  name,
  onChange,
  disabled,
  theme = "primary",
  rounded = "rounded-full",
  size = "w-[44px] h-[24px]",
  children,
  childrenInLeft,
  ...rest
}: UxSwitchProps) {
  return (
    <div
      className={["inline-flex flex-row items-center"].join(" ")}
      // {...clickEvents}
      onClick={() => {
        if (disabled) {
          return;
        }
        onChange && onChange(!value);
      }}
      {...rest}
    >
      {childrenInLeft && children && <div className="mx-2 flex-1">{children}</div>}
      <div
        data-group-item={name}
        className={[
          "relative inline-flex items-center border-[3px] duration-100",
          rounded,
          size,
          disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer opacity-100",
          value ? `bg-${theme} border-primary` : "border-deep bg-deep border-opacity-0 bg-opacity-[0.07]",
          className,
        ].join(" ")}
      >
        <div
          className={[
            "h-full w-1/2 bg-white shadow duration-200 will-change-transform",
            rounded,
            value ? "translate-x-full" : "translate-x-0",
            // selected ? "bg-white" : "bg-" + theme,
          ].join(" ")}
        ></div>
      </div>
      {!childrenInLeft && children && <div className="mx-2 flex-1">{children}</div>}
    </div>
  );
}
