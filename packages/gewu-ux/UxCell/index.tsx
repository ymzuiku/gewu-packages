import { DivProps } from "react-override-props";
import { useClickBg } from "../hooks/useClick";
import { UxSvg } from "../UxSvg";

export type UxCellProps = DivProps<{
  line?: boolean;
}>;

export function UxArrowIcon() {
  return <UxSvg className="my-auto h-7 w-7 opacity-70" src="/icons/feather2/chevron-right.svg"></UxSvg>;
}

export function UxCell({ className, children, line, ...rest }: UxCellProps) {
  const [, clickCss, clickEvents] = useClickBg();
  return (
    <div
      className={["felx-row relative flex w-full items-center justify-center p-3", className, clickCss].join(" ")}
      {...rest}
      {...clickEvents}
    >
      <h3 className="flex flex-1 flex-row items-center justify-start">{children}</h3>
      <UxArrowIcon />
      {line && <div className="bottom-1px border-info absolute bottom-0 left-0 w-full" />}
    </div>
  );
}
