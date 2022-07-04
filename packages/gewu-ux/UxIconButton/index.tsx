import { useClickBg } from "../hooks/useClick";
import { UxSvg, UxSvgProps } from "../UxSvg";

export function UxIconButton({ className, src, img, ...rest }: UxSvgProps) {
  const [, clickCss, clickEvents] = useClickBg();
  return (
    <div
      className={["h-10 w-10 rounded-md", img ? "p-1" : "p-2", clickCss, className].join(" ")}
      {...clickEvents}
      {...rest}
    >
      <UxSvg className="pointer-events-none" img={img} src={src} />
    </div>
  );
}
