import { useState } from "react";
import { DivProps } from "react-override-props";
import { useClickBg } from "../hooks/useClick";
import { UxModal } from "../UxModal";
import { arrowIcon } from "../UxNativeSelect";
import { UxSvg } from "../UxSvg";
import { UxIconPickerList } from "./UxIconPickerList";

export type UxIconPickerProps = DivProps<{
  value?: string;
  textRight?: boolean;
  className?: string;
  "test-id"?: string;
  textClassName?: string;
  onChange?: (src: string) => void;
}>;

export function UxIconPicker({
  children,
  value = "",
  className,
  textRight,
  textClassName,
  onChange,
  "test-id": testId,
  ...rest
}: UxIconPickerProps) {
  const [, downCss, clickEvents] = useClickBg();
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleChange = (src: string) => {
    onChange && onChange(src);
    setShow(false);
  };

  return (
    <div className={className} {...rest}>
      <div
        {...clickEvents}
        className={["pointer-events-auto", downCss, "inline-flex flex-row items-center rounded-lg py-2 px-2"].join(" ")}
        onClick={handleClick}
        test-id={testId}
      >
        <span className={[textClassName, textRight && "text-right"].join(" ")}>
          {value ? <UxSvg className="text-def h-7 w-7" src={value}></UxSvg> : children}
        </span>
        <UxSvg className="text-primary ml-1" src={arrowIcon}></UxSvg>
      </div>
      <UxModal show={show}>
        <UxIconPickerList test-id={testId} handleClose={handleClose} onChanged={handleChange} value={value} />
      </UxModal>
    </div>
  );
}
