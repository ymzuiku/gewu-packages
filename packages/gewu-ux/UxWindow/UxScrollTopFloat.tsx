import { DivProps } from "react-override-props";
import { useClickScale } from "../hooks/useClick";
import { UxHeader } from "../UxHeader";
import { UxSvg } from "../UxSvg";

export type UxFloatButtonProps = DivProps<{
  show: boolean;
}>;

export function UxScrollTopFloat({ className, show, ...rest }: UxFloatButtonProps) {
  const [isClick, clickCss, clickEvents] = useClickScale();

  return (
    <UxSvg
      className={[
        "bg-secondary text-front-secondary flex h-7 w-12 flex-row items-center justify-center rounded-full p-[2px]",
        UxHeader.options.blur,
        clickCss,
        isClick ? "shadow" : "shadow-lg shadow-black/5",
        show ? "scale-100 opacity-100" : "scale-0 opacity-10",
        className,
      ].join(" ")}
      src="/icons/feather2/chevrons-up.svg"
      {...clickEvents}
      {...rest}
    />
  );
}
