import { gewuRoute } from "gewu-route";
import { DOMAttributes, useState } from "react";
import { useClick } from "../hooks/useClick";
import { backSvg } from "../UxBackButton";
import { UxHeader } from "../UxHeader";
import { UxSvg } from "../UxSvg";

export interface UxTabbarItem {
  icon: string;
  selectedIcon?: string;
  label: string;
  selected?: boolean;
  "test-id"?: string;
  onChanged?: (label: string) => void;
}

export interface UxTabbarProps extends DOMAttributes<HTMLElement> {
  className?: string;
  items: UxTabbarItem[];
  selectedLabel: string;
  onChanged?: (label: string) => void;
}

function Item({ onChanged, icon, selected, selectedIcon, label, ...rest }: UxTabbarItem) {
  const [isDown, clickEvents] = useClick();
  return (
    <div
      className={[
        "flex flex-1 flex-col items-center justify-center rounded-md py-3",
        selected ? "text-primary" : "text-info",
        isDown ? "bg-primary bg-opacity-5" : "",
      ].join(" ")}
      {...clickEvents}
      {...rest}
      onClick={() => {
        onChanged && onChanged(label);
      }}
    >
      <UxSvg className="h-7 w-7" src={!selected ? icon : selectedIcon || icon}></UxSvg>
      <span className={["pt-1 text-xs", selected ? "text-def" : "text-info"].join(" ")}>{label}</span>
    </div>
  );
}

export function UxTabbar({ selectedLabel: baseLabel, items, className, onChanged, ...rest }: UxTabbarProps) {
  const [selectedLabel, setSelectLabel] = useState(baseLabel);
  const handleChanged = (label: string) => {
    setSelectLabel(label);
    onChanged && onChanged(label);
  };
  return (
    <div
      className={[
        "bg-def flex w-full flex-row justify-between",
        UxHeader.options.blur,
        gewuRoute.isIOSWechat() ? "pb-7" : "pb-safe",
        className,
      ].join(" ")}
      {...rest}
    >
      {items.map((item) => {
        return <Item onChanged={handleChanged} selected={selectedLabel === item.label} key={item.label} {...item} />;
      })}
    </div>
  );
}

export function UxTabbarFloat(props: UxTabbarProps) {
  return (
    <div id="app-tabbar" className="absolute bottom-0 left-0 z-[50] w-full">
      <div className="top-1px border-deep border-opacity-[0.05]"></div>
      <UxTabbar {...props}></UxTabbar>
    </div>
  );
}

UxTabbarFloat.Space = function UxTabbarFloatSpace({ className }: { className?: string }) {
  return (
    <div id="app-tabbar" className="opacity-0">
      <div className="top-1px"></div>
      <div
        className={[
          "flex w-full flex-row justify-between",
          UxHeader.options.blur,
          gewuRoute.isIOSWechat() ? "pb-7" : "pb-safe",
          className,
        ].join(" ")}
      >
        <Item selected={false} icon={backSvg} label="space" />
      </div>
    </div>
  );
};
