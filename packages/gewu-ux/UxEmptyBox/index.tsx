import { CSSProperties, DOMAttributes } from "react";
import { UxSvg } from "../UxSvg";

export interface UxEmptyBoxProps extends DOMAttributes<HTMLElement> {
  className?: string;
  style?: CSSProperties;
  title: string;
}

export function UxEmptyBox({ title, className, ...rest }: UxEmptyBoxProps) {
  return (
    <div className={["flex flex-col items-center justify-center p-6 opacity-60", className].join(" ")} {...rest}>
      <UxSvg className="text-info h-16 w-16" src="/icons/feather2/inbox.svg"></UxSvg>
      <h3 className="text-info mt-2 text-sm">{title}</h3>
    </div>
  );
}
