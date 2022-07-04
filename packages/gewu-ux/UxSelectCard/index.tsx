import React from "react";
import { DivProps } from "react-override-props";
import { useClickBg } from "../hooks/useClick";
import { ThemeType } from "../theme";
import { UxSvg } from "../UxSvg";

export type UxSelectCardItemProps = DivProps<{
  label: string;
  icon: string;
  name: string;
  onChange?: (name: string) => void;
  theme?: ThemeType;
  selected?: boolean;
  isLast?: boolean;
}>;

export type UxSelectCardProps = DivProps<{
  className?: string;
  theme?: ThemeType;
  selectedTheme?: ThemeType;
  value?: string;
  name?: string;
  onChange?: (name: string) => void;
  items: UxSelectCardItemProps[];
}>;

function UxSelectGroupItem({ label, selected, icon, name, theme, onChange, isLast, ...rest }: UxSelectCardItemProps) {
  const [, downCss, clickEvents] = useClickBg();
  return (
    <div className="flex h-full flex-1 flex-row">
      <div
        onClick={() => {
          if (onChange) {
            onChange(name);
          }
        }}
        {...clickEvents}
        className={[
          "flex h-full w-full flex-1 flex-col items-center justify-center",
          selected ? "bg-weak" : "bg-info",
          selected ? "text-" + theme : "text-info",
          downCss,
        ].join(" ")}
        {...rest}
      >
        <UxSvg className="h-8 w-8" src={icon}></UxSvg>
        <div>{label}</div>
      </div>
      {!isLast && (
        <div className={[`right-1px border-deep h-full flex-shrink-0 border-opacity-[0.17]`].join(" ")}></div>
      )}
    </div>
  );
}

export function UxSelectCard({ className, value, items, theme = "primary", onChange, ...rest }: UxSelectCardProps) {
  return (
    <div
      className={[`flex h-20 w-full flex-row items-center justify-between overflow-hidden rounded-lg`, className].join(
        " ",
      )}
      {...rest}
    >
      {items.map((item, i) => {
        return (
          <React.Fragment key={item.name}>
            <UxSelectGroupItem
              selected={value === item.name}
              onChange={(value: string) => {
                if (onChange) {
                  onChange(value);
                }
              }}
              theme={theme}
              isLast={i == items.length - 1}
              key={item.name}
              {...item}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
