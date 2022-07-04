import { CSSProperties } from "react";
import { TextAreaProps } from "react-override-props";

export type UxTextAreaProps = TextAreaProps<{
  style?: CSSProperties;
  placeholder?: string;
  value?: string;
}>;

export function UxTextArea({
  value,
  className,
  children,
  placeholder = "Please input",
  onChange,
  onInput,
  ...rest
}: UxTextAreaProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      className={["bg-input relative min-h-[60px] rounded-lg px-3 py-3 duration-300 ease-out", className].join(" ")}
      onInput={(e) => {
        onInput && onInput(e);
        onChange && onChange(e);
      }}
      {...rest}
    >
      {children}
    </textarea>
  );
}
