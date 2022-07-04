import { CSSProperties, useEffect, useState } from "react";
import { DivProps } from "react-override-props";
import { useClickScale } from "../hooks/useClick";
import { UxSvg } from "../UxSvg";

export type UxFloatButtonProps = DivProps<{
  className?: string;
  style?: CSSProperties;
  src?: string;
  bottom?: number;
  // topTo?: string;
  inPageAnime?: boolean;
}>;

export function UxFloatButton({
  className,
  inPageAnime,
  bottom = 16,
  src = "/icons/iconly/Bold/Paper Plus.svg",
  ...rest
}: UxFloatButtonProps) {
  const [isClick, clickCss, clickEvents] = useClickScale();
  const [show, setShow] = useState(true);
  // const [bottomPx, setBottonPx] = useState(0);
  const [inPage, setInPage] = useState(inPageAnime ? false : true);

  useEffect(() => {
    if (inPageAnime) {
      setTimeout(() => {
        setInPage(true);
      }, 100);
    }

    let timeout: NodeJS.Timeout | null;
    let tick = false;
    const scroll = () => {
      if (!tick) {
        tick = true;
        window.requestAnimationFrame(() => {
          tick = true;
        });
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        setShow(false);
        timeout = setTimeout(() => {
          setShow(true);
        }, 300);
      }
    };
    window.addEventListener("scroll", scroll);
    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  // if (topTo && bottomPx === 0) {
  //   return <></>;
  // }

  return (
    <UxSvg
      className={[
        "bg-primary text-front-primary flex h-14 w-14 flex-row items-center justify-center rounded-full p-4",
        clickCss,
        isClick ? "shadow" : "shadow-lg",
        show ? "scale-100 opacity-100" : "scale-0 opacity-10",
        inPage ? "translate-x-0" : "translate-x-24",
        className,
      ].join(" ")}
      style={{
        bottom,
        right: 16,
        position: "absolute",
      }}
      src={src}
      {...clickEvents}
      {...rest}
    />
  );
}
