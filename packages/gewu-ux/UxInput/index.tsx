import { isDesktopSafari } from "gewu-utils/device";
import { useRef, useState } from "react";
import { InputProps } from "react-override-props";
import { UxButton } from "../UxButton";
import { UxSvg } from "../UxSvg";

const closeSvg = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.67 2h8.67C19.73 2 22 4.38 22 7.92v8.17c0 3.53-2.27 5.91-5.66 5.91H7.67C4.28 22 2 19.62 2 16.09V7.92C2 4.38 4.28 2 7.67 2Zm7.34 13a.868.868 0 0 0 0-1.23l-1.78-1.78 1.78-1.78a.88.88 0 0 0 0-1.24.88.88 0 0 0-1.24 0L12 10.75l-1.78-1.78a.88.88 0 0 0-1.24 0 .88.88 0 0 0 0 1.24l1.78 1.78-1.78 1.77a.88.88 0 0 0 .62 1.5c.23 0 .45-.09.62-.26L12 13.23 13.78 15c.17.18.39.26.61.26.23 0 .45-.09.62-.26Z" fill="currentColor"></path></svg>`;

export type UxInputProps = InputProps<{
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  placeholderUp?: boolean;
  disabled?: boolean;
  placeholderClassName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  innerRef?: { current?: any };
  height?: string;
  search?: string;
  icon?: string;
  value?: string;
  iconColor?: string;
  focusLine?: boolean;
  notTip?: boolean;
  max?: number;
  min?: number;
  type?: string;
  typeInt?: boolean;
  error?: string;
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  thin?: boolean;
  right?: boolean;
}>;

const nums = {
  "0": true,
  "1": true,
  "2": true,
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
  "8": true,
  "9": true,
} as Record<string, boolean>;

const isMacSafira = isDesktopSafari();

export function UxInput({
  onFocus,
  onBlur,
  icon,
  placeholderUp = true,
  placeholder,
  error,
  className,
  innerRef,
  onChange,
  height = "h-12",
  focusLine,
  search,
  placeholderClassName,
  inputClassName,
  disabled,
  right,
  value = "",
  thin,
  max,
  min,
  type,
  typeInt,
  notTip,
  onInput,
  iconColor = "text-def opacity-60",
  ...rest
}: UxInputProps) {
  const [focus, setFocuse] = useState(false);
  const refWidth = useRef(0);

  const handleClear = () => {
    if (disabled) {
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange && onChange({ currentTarget: { value: "" } } as any);
  };

  value = String(value);

  const clearSvg = () =>
    search ? (
      <UxButton
        theme="primary"
        type="submit"
        className={[
          "whitespace-nowrap text-sm will-change-transform",
          value.length > 0 || focus ? "scale-100 opacity-100" : "scale-50 opacity-0",
        ].join(" ")}
        padding="px-3 py-2"
      >
        {search}
      </UxButton>
    ) : (
      <UxSvg
        className={["text-def ml-1 h-5 flex-shrink-0 opacity-30 duration-150 ease-out", focus ? "w-5" : "w-0"].join(
          " ",
        )}
        src={closeSvg}
        onClick={handleClear}
      ></UxSvg>
    );

  return (
    <div
      className={[
        "relative rounded-lg px-3 duration-300 ease-out",
        disabled && "pointer-events-none opacity-40",
        height,
        !thin && (focus ? "bg-weak shadow-sm" : "bg-input"),
        className,
      ].join(" ")}
    >
      <div className="flex h-full w-full flex-row items-center bg-transparent">
        {icon && <UxSvg className={["mr-2 h-6 w-6", iconColor].join(" ")} src={icon}></UxSvg>}
        {right && clearSvg()}
        <input
          autoComplete={type == "password" ? "new-password" : "off"}
          ref={(r) => {
            if (innerRef) {
              innerRef.current = r;
            }
          }}
          type={type}
          value={value}
          min={min}
          max={max}
          className={["h-full w-full flex-1 bg-transparent", right && "text-right", inputClassName].join(" ")}
          style={{ width: refWidth.current ? refWidth.current - 20 : "100%" }}
          onInput={(e) => {
            if (disabled) {
              return;
            }
            let v = e.currentTarget.value;
            if (max) {
              v = v.slice(0, max);
            }
            // 修复某些特殊浏览器 number 输出没有限制
            if (!typeInt && type === "number" && isNaN(Number(v))) {
              e.currentTarget.value = v.slice(0, v.length - 1);
            }
            // 限制整数
            if (typeInt && type === "number" && !nums[v[v.length - 1]]) {
              e.currentTarget.value = v.slice(0, v.length - 1);
            }
            onInput && onInput(e);
            onChange && onChange(e);
          }}
          onFocus={(e) => {
            if (placeholderUp) {
              setFocuse(true);
            }
            if (onFocus) {
              onFocus(e);
            }
          }}
          onBlur={(e) => {
            if (placeholderUp) {
              setFocuse(false);
            }

            if (onBlur) {
              onBlur(e);
            }
          }}
          {...rest}
        />
        {!right && clearSvg()}
      </div>
      {focusLine && (
        <div
          className={[
            "bottom-1px border-primary absolute bottom-0 left-0 w-full origin-center duration-150 ease-out",
            focus ? "scale-x-100" : "scale-x-0",
          ].join(" ")}
        ></div>
      )}
      <div
        className={[
          "pointer-events-none absolute top-1/2 -translate-y-1/2 font-normal ease-out",
          value.length > 0 ? "opacity-0" : "opacity-40",
          right ? "right-3" : icon ? "left-11" : "left-3",
          placeholderClassName,
        ].join(" ")}
      >
        {placeholder}
      </div>
      {!notTip ? (
        <div
          className={[
            "pointer-events-none absolute top-1/2 right-0 flex -translate-y-1/2 flex-row items-center duration-200 ease-out",
            focus
              ? (isMacSafira && type === "password") || type === "phone"
                ? "-translate-x-16"
                : "-translate-x-9"
              : "-translate-x-3",
          ].join(" ")}
        >
          {!search && !thin && !error && (
            <div className={["text-sm font-normal", value.length > 0 ? "opacity-50" : "opacity-0"].join(" ")}>
              {placeholder || ""}
            </div>
          )}
          {error && <div className="text-danger text-sm">{error}</div>}
        </div>
      ) : null}
    </div>
  );
}
