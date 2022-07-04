import { DivProps } from "react-override-props";
import { useClickBg } from "../hooks/useClick";
import { ThemeType } from "../theme";
import { UxSvg } from "../UxSvg";

const rightSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><path d="M20 6 9 17l-5-5"></path></svg>`;

export type UxCheckboxProps = DivProps<{
  value?: boolean;
  disabled?: boolean;
  theme?: ThemeType;
  rounded?: string;
  svg?: string;
  labelClassName?: string;
  contextClassName?: string;
  size?: string;
  rotate?: boolean;
  flexItem?: string;
  childrenInLeft?: boolean;
  onChange?: (selected: boolean) => void;
}>;

export function UxCheckbox({
  value,
  className,
  theme = "primary",
  onChange,
  disabled,
  rounded = "rounded-md",
  svg = rightSvg,
  size = "w-6 h-6",
  rotate = true,
  flexItem = "items-center",
  contextClassName,
  children,
  labelClassName,
  childrenInLeft,
  ...rest
}: UxCheckboxProps) {
  const [, isDownCss, clickEvent] = useClickBg();

  return (
    <div
      className={[
        "inline-flex h-auto rounded p-1",
        flexItem,
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        isDownCss,
        className,
      ].join(" ")}
      {...rest}
      {...clickEvent}
      onClick={() => {
        if (disabled) {
          return;
        }
        onChange && onChange(!value);
      }}
    >
      {childrenInLeft && children && <div className={["mx-2 flex-1", labelClassName].join(" ")}>{children}</div>}
      <div className={["relative", size, contextClassName].join(" ")}>
        <div
          className={[
            "pointer-events-none absolute left-0 top-0 h-full w-full border duration-300 ease-out",
            !value && disabled
              ? "border-deep bg-deep border-opacity-[0.35] bg-opacity-[0.15]"
              : "border-deep border-opacity-25",
            rounded,
          ].join(" ")}
        ></div>
        <div
          className={[
            `absolute left-0 top-0 h-full w-full duration-150 ease-out bg-${theme}  border border-${theme} pointer-events-none`,
            disabled && "opacity-60",
            !value ? "scale-50 rounded-lg opacity-0" : rounded,
          ].join(" ")}
        ></div>
        <div
          className={[
            "absolute left-0 top-0 h-full w-full text-white duration-300 ease-out",
            !value ? "scale-[0.35] opacity-0" : "scale-75",
            !value && rotate ? "translate-y-3 -rotate-[60deg]" : "translate-y-0 rotate-0",
          ].join(" ")}
        >
          <UxSvg src={svg}></UxSvg>
        </div>
      </div>
      {!childrenInLeft && children && <div className="mx-2 flex-1">{children}</div>}
    </div>
  );
}
