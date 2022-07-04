import { DivProps } from "react-override-props";
import { UxHeader } from ".";

export type UxHeaderPaddingTopProps = DivProps<{
  className?: string;
}>;

export function UxHeaderPaddingTop({ className, children, ...rest }: UxHeaderPaddingTopProps) {
  return (
    <div className={[className].join(" ")} {...rest}>
      <div style={{ height: UxHeader.options.height }}></div>
      {children}
    </div>
  );
}
