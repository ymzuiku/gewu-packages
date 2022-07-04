import { DivProps } from "react-override-props";

export function UxWindowListEnd({ children, ...rest }: DivProps<{ name?: string }>) {
  return (
    <div className="text-info pt-5 text-center text-sm" {...rest}>
      {children}
    </div>
  );
}
