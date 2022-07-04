import { SelectProps } from "react-override-props";
import { useClick } from "../hooks/useClick";
import { UxSvg } from "../UxSvg";

export const arrowIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

export type UxSelectProps = SelectProps<{
  theme?: string;
  selectProps?: SelectProps<{ name?: string }>;
}>;

export function UxNativeSelect({ children, className, style, onChange, selectProps, ...rest }: UxSelectProps) {
  const [isDown, clickEvents] = useClick();
  return (
    <div
      className={["bg-info flex flex-row items-center rounded-lg py-2 px-2", isDown && "opacity-50", className].join(
        " ",
      )}
      {...clickEvents}
      style={style}
    >
      <select
        onChange={(e) => {
          if (onChange) {
            onChange(e);
          }
        }}
        className="h-full w-full bg-transparent outline-none"
        {...selectProps}
        {...rest}
      >
        {children}
      </select>
      <UxSvg src={arrowIcon}></UxSvg>
    </div>
  );
}
