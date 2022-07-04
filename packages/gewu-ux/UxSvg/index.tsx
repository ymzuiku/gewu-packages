import { fetchOnce } from "gewu-utils/fetchOnce";
import { useEffect, useRef } from "react";
import { ImageProps as DivProps } from "react-override-props";

const checkIsScript = new RegExp("<script");
const checkIsSvg = new RegExp("<svg");

export type UxSvgProps = DivProps<{
  src?: string;
  img?: boolean;
  baseSrc?: string;
}>;

export const defaultSvgSrc = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" class="feather feather-paperclip"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>`;

export function UxSvg({ src = defaultSvgSrc, img, baseSrc, className, ...rest }: UxSvgProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      if (checkIsSvg.test(src)) {
        if (ref.current) {
          ref.current.innerHTML = src;
        }
      } else {
        fetchOnce(src).then((v) => {
          if (!v || checkIsScript.test(v)) {
            if (baseSrc) {
              fetchOnce(baseSrc).then((v2) => {
                if (!checkIsScript.test(v2)) {
                  if (ref.current) {
                    ref.current.innerHTML = v2;
                  }
                }
              });
            } else {
              if (ref.current) {
                ref.current.innerHTML = "";
              }
            }
          } else {
            if (ref.current) {
              ref.current.innerHTML = v;
            }
          }
        });
      }
    }
  }, [src]);

  if (img) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return <img src={src} className={["h-full w-full", className].join(" ")} {...(rest as any)} />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <div ref={ref} className={className} {...(rest as any)}></div>;
}
