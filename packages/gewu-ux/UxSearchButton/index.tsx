import React, { CSSProperties, useRef, useState } from "react";
import { UxIconButton } from "../UxIconButton";
import { UxInput, UxInputProps } from "../UxInput";

export interface UxSearchProps extends UxInputProps {
  className?: string;
  style?: CSSProperties;
  iconSize?: string;
  onSetShow?: (show: boolean) => void;
  iconBoxClassName?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

export function UxSearchButton({
  iconSize = "w-10 h-10",
  onSetShow,
  onBlur,
  className,
  iconBoxClassName,
  ...rest
}: UxSearchProps) {
  const ref = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);
  return (
    <>
      {focus ? (
        <UxInput
          className="w-full"
          innerRef={ref}
          onBlur={(e) => {
            if (!e.currentTarget.value) {
              if (onSetShow) {
                onSetShow(false);
              }
              setFocus(false);
            }
            if (onBlur) {
              onBlur(e);
            }
          }}
          {...rest}
        />
      ) : (
        <div className={["flex flex-row justify-end", iconBoxClassName].join(" ")}>
          <UxIconButton
            className={[className, iconSize].join(" ")}
            src="/icons/feather2/search.svg"
            onClick={() => {
              if (onSetShow) {
                onSetShow(true);
              }
              setFocus(true);
              requestAnimationFrame(() => {
                ref.current?.focus();
              });
            }}
          />
        </div>
      )}
    </>
  );
}
