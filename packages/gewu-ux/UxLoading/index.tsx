import { DivProps } from "react-override-props";
import { UxSvg } from "../UxSvg";

export type UxLoadingProps = DivProps<{
  className?: string;
}>;

export function UxLoading({ className, ...rest }: UxLoadingProps): JSX.Element {
  return (
    <UxSvg
      className={["text-primary mx-auto h-10 w-10", className].join(" ")}
      src="/icons/loading/svg-loaders/puff.svg"
      {...rest}
    ></UxSvg>
  );
}
