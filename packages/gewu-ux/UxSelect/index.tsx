import { useState } from "react";
import { DivProps } from "react-override-props";
import { useClickBg } from "../hooks/useClick";
import { OkCancelButtons } from "../UxAlert";
import { UxCheckbox } from "../UxCheckbox";
import { UxGroup, UxItemProps } from "../UxGroup";
import { UxModal } from "../UxModal";
import { arrowIcon } from "../UxNativeSelect";
import { UxOption } from "../UxOption";
import { UxSvg } from "../UxSvg";

export type UxSelectProps = DivProps<{
  className?: string;
  disableds?: Set<string>;
  disabled?: boolean;
  theme?: string;
  itemProps?: DivProps<{ name?: string }>;
  items: UxItemProps[];
  multiple?: boolean;
  padding?: string;
  cancel?: JSX.Element;
  emptyLabel?: string;
  textClassName?: string;
  groupClassName?: string;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
}>;

function getLabels(value: string, items: UxItemProps[]) {
  const values = new Set(value.split(", "));
  const out: string[] = [];
  items.forEach((item) => {
    if (values.has(item.name)) {
      out.push(item.label);
    }
  });
  return out.join(", ");
}

export function UxSelect({
  children,
  multiple,
  value,
  items,
  className,
  padding = "p-2",
  itemProps,
  textClassName,
  groupClassName,
  cancel = <>cancel</>,
  onChange,
  emptyLabel = "empty",
  disabled,
  disableds,
  ...rest
}: UxSelectProps) {
  const [, downCss, clickEvents] = useClickBg();
  const [show, setShow] = useState(false);
  const handleClick = () => {
    if (disabled) {
      return;
    }
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Option: any = multiple ? UxCheckbox : UxOption;
  let label;

  if (value) {
    label = getLabels(typeof value === "string" ? value : value.join(", "), items);
  } else {
    label = children;
  }

  return (
    <div>
      <div
        {...clickEvents}
        {...rest}
        className={[
          "pointer-events-auto",
          downCss,
          "inline-flex flex-row items-center rounded-lg",
          padding,
          disabled ? "pointer-events-none opacity-60" : "",
          className,
        ].join(" ")}
        onClick={handleClick}
      >
        <span className={textClassName}>{label}</span>
        <UxSvg className="text-primary ml-1" src={arrowIcon}></UxSvg>
      </div>
      <UxModal show={show}>
        <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center overflow-y-auto px-5">
          <div className="bg-def pointer-events-auto relative flex max-h-[calc(100vh-40px)] w-full flex-col  rounded-lg shadow-2xl">
            <>
              {items.length ? (
                <UxGroup
                  items={items}
                  value={value}
                  multiple={multiple}
                  onChange={(v) => {
                    onChange && onChange(v);
                    if (!multiple) {
                      handleClose();
                    }
                  }}
                  className={["flex flex-col overflow-y-auto p-4", groupClassName].join(" ")}
                >
                  {(item) => (
                    <Option disabled={disableds && disableds.has && disableds.has(item.name)} {...item} {...itemProps}>
                      {item.label}
                    </Option>
                  )}
                </UxGroup>
              ) : (
                <div className="text-info py-6 text-center">{emptyLabel}</div>
              )}
            </>
            {<OkCancelButtons cancel={cancel} hiddenCancel onOk={handleClose}></OkCancelButtons>}
          </div>
        </div>
      </UxModal>
    </div>
  );
}
