import { CSSProperties } from "react";
import { ButtonProps } from "react-override-props";
import { UxButton } from "../UxButton";

export type UxHeaderSubmitProps = ButtonProps<{
  className?: string;
  style?: CSSProperties;
}>;

export function UxHeaderSubmit({ children, className, ...rest }: UxHeaderSubmitProps) {
  return (
    <UxButton test-id="submit" className={["h-10 flex-shrink-0", className].join(" ")} {...rest}>
      {children}
    </UxButton>
  );
}
