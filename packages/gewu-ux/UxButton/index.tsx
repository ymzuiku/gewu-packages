import { ButtonProps } from "react-override-props";
import { useClickScale } from "../hooks/useClick";
import { ThemeType } from "../theme";

export type UxButtonProps = ButtonProps<{
  theme?: ThemeType;
  shadow?: boolean;
  padding?: string;
  type?: string;
}>;

export function UxButton({
  children,
  className,
  theme = "primary",
  padding = "py-3 px-6",
  shadow = true,
  type = "button",
  ...rest
}: UxButtonProps) {
  const border = theme === "def" ? "border border-weak" : "";
  const [isDown, isDownCss, clickEvents] = useClickScale();
  return (
    <button
      type={type}
      {...clickEvents}
      className={[
        `text-center text-front-${theme}  bg-${theme}  flex cursor-pointer select-none flex-row items-center justify-center rounded-lg duration-200 ease-out`,
        border,
        padding,
        theme !== "def" && shadow && !isDown && "shadow",
        isDownCss,
        className,
      ].join(" ")}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      {...(rest as any)}
    >
      {children}
    </button>
  );
}
