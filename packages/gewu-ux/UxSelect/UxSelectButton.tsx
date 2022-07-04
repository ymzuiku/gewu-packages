import { CSSProperties } from "react";
import { DivProps } from "react-override-props";
import { useClickBg } from "../hooks/useClick";
import { arrowIcon } from "../UxNativeSelect";
import { UxSvg } from "../UxSvg";

export type UxSelectButtonProps = DivProps<{
  icon?: string;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (e: any) => void;
  value?: string;
}>;

export function UxSelectButton({
  icon,
  innerRef,
  value,
  disabled,
  className,
  children,
  onClick,
  ...rest
}: UxSelectButtonProps) {
  const [, downCss, clickEvents] = useClickBg();

  return (
    <div
      ref={innerRef}
      {...clickEvents}
      {...rest}
      className={[
        "pointer-events-auto",
        downCss,
        "inline-flex flex-row items-center rounded-lg py-2 px-2",
        disabled ? "pointer-events-none opacity-60" : "",
        className,
      ].join(" ")}
      onClick={onClick}
    >
      {icon && <UxSvg className="text-primary mr-1 h-6 w-6" src={icon} />}
      <span className={["max-w-[200px] truncate text-right"].join(" ")}>{value ? value : children}</span>
      <UxSvg className="text-primary ml-1" src={arrowIcon}></UxSvg>
    </div>
  );
}
