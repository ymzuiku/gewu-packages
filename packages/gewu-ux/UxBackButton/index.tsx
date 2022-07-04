import { gewuRoute } from "gewu-route";
import { DivProps } from "react-override-props";
import { useClickBg } from "../hooks/useClick";
import { UxSvg } from "../UxSvg";

export const backSvg = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.25 12.2743L19.25 12.2743" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
<path d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`;

export type UxBackButtonProps = DivProps<{
  className?: string;
}>;

export function UxBackButton({ children, onClick, ...rest }: UxBackButtonProps) {
  const [, clickCss, clickEvents] = useClickBg();
  return (
    <div
      test-id="back"
      {...clickEvents}
      {...rest}
      onClick={(e) => {
        if (onClick) {
          onClick(e as never);
        } else {
          gewuRoute.goBack();
        }
      }}
    >
      <div
        className={[
          "pointer-events-none inline-flex flex-shrink-0 flex-row items-center rounded-md p-2",
          clickCss,
        ].join(" ")}
      >
        {" "}
        <UxSvg className="mr-2 h-6 w-6 flex-shrink-0" src={backSvg} />
        <span className="flex-shrink-0">{children}</span>
      </div>
    </div>
  );
}
