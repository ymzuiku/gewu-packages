/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPhone } from "gewu-utils/device";
import { DOMAttributes, useEffect, useMemo, useRef } from "react";

export interface SwipeData {
  moveX: number;
  containerWidth: number;
  nowNum: number;
  length: number;
  kind: "touch" | "event";
  isTouch: boolean;
}

export interface UxSwipeProps extends DOMAttributes<HTMLElement> {
  className?: string;
  onChanged?: (index: number, data: SwipeData) => any;
  children: any[];
  // num?: number;
}

export interface UxSwipeElement extends DOMAttributes<HTMLElement> {
  moveTo: (num: number) => void;
}

export function UxSwipe({ onChanged, children, className, ...rest }: UxSwipeProps) {
  const ref = useRef<HTMLDivElement>(null);
  let lastX = 0;
  let x = 0;
  let w = -1;
  let num = 0;
  let t = 0;
  const len = children ? children.length : 0;
  let lock = false;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      lock = true;
    });
    const out = ref.current;
    if (!out) {
      return;
    }
    let isTouchStart = false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const touchstart = (e: any, isTouch?: boolean) => {
      isTouchStart = true;
      if (w < 0) {
        const ele = out.children.item(0) as HTMLDivElement;
        if (ele) {
          // console.log(ele.offsetWidth, ele.clientWidth);
          w = ele.offsetWidth;
        }
      }
      lock = false;
      t = Date.now();
      lastX = isTouch ? e.touches[0].clientX : e.clientX;
      out.style.transition = "0.2s transform ease-out";
      e.stopPropagation();
    };

    if (isPhone()) {
      out.addEventListener("touchstart", (e: any) => touchstart(e, true));
    } else {
      out.addEventListener("mousedown", (e: any) => touchstart(e, false));
    }

    const touchmove = (e: any, isTouch?: boolean) => {
      if (!isTouchStart) {
        return;
      }
      const _x = isTouch ? e.touches[0].clientX : e.clientX;
      x = _x - lastX;
      if (lock) {
        if (x !== 0) {
          x = 0;
          out.style.transform = `translateX(${num * w + x}px)`;
          if (onChanged) {
            onChanged(-num, {
              isTouch: !!isTouch,
              moveX: x,
              containerWidth: w,
              nowNum: -num,
              length: len,
              kind: "touch",
            });
          }
        }
        return;
      }
      if (x < 80 && x > -80) {
        return;
      }
      out.style.transform = `translateX(${num * w + x}px)`;

      if (onChanged) {
        onChanged(-num, {
          isTouch: !!isTouch,
          moveX: x,
          containerWidth: w,
          nowNum: -num,
          length: len,
          kind: "touch",
        });
      }

      e.stopPropagation();
    };

    if (isPhone()) {
      out.addEventListener("touchmove", (e) => touchmove(e, true));
    } else {
      out.addEventListener("mousemove", (e) => touchmove(e, false));
    }

    const touchend = (e: any, isTouch?: boolean) => {
      isTouchStart = false;
      if (lock) {
        return;
      }
      let add = 0;
      const useTime = Date.now() - t;
      let fix = 3;
      if (useTime < 800) {
        fix = 10;
      }
      if (x > 0 && x > w / fix) {
        add = 1;
      } else if (x < 0 && x < w / fix) {
        add = -1;
      }
      // const add = Math.round(x / w);
      e.stopPropagation();
      num += ~~(x / w) + add;
      x = 0;
      if (num < -len + 1) {
        num = -len + 1;
      } else if (num > 0) {
        num = 0;
      }

      out.style.transition = "0.5s transform ease-out";
      setTimeout(() => {
        out.style.transform = `translateX(${num * w}px)`;
      }, 30);

      if (onChanged) {
        onChanged(-num, {
          isTouch: !!isTouch,
          moveX: x,
          containerWidth: w,
          nowNum: -num,
          length: len,
          kind: "touch",
        });
      }
    };

    if (isPhone()) {
      out.addEventListener("touchend", (e) => touchend(e, true));
      out.addEventListener("touchcancel", (e) => touchend(e, true));
    } else {
      out.addEventListener("mouseup", (e) => touchend(e, false));
      out.addEventListener("mouseout", (e) => touchend(e, false));
    }

    // const moveTo = (index: number) => {
    //   if (document.contains(out)) {
    //     if (w < 0) {
    //       const ele = out.children.item(0) as HTMLDivElement;
    //       if (ele) {
    //         // console.log(ele.offsetWidth, ele.clientWidth);
    //         w = ele.offsetWidth;
    //       }
    //     }
    //     num = index;

    //     out.style.transition = "0.5s transform ease-out";
    //     setTimeout(() => {
    //       out.style.transform = `translateX(${num * w}px)`;
    //     }, 30);

    //     if (onChanged) {
    //       onChanged(-num, {
    //         isTouch: false,
    //         moveX: x,
    //         containerWidth: w,
    //         nowNum: -num,
    //         length: len,
    //         kind: "event",
    //       });
    //     }
    //   }
    // };
    // moveTo(-startNum);
  }, []);

  return useMemo(
    () => (
      <div className="relative h-full w-full overflow-hidden">
        <div ref={ref} className={[`flex flex-row will-change-auto`, className].join(" ")} {...rest}>
          {(children as any)!.map((v: any, i: number) => {
            return (
              <div data-swipe={i} key={"swipe" + i} className="h-full w-full flex-shrink-0">
                {v}
              </div>
            );
          })}
        </div>
      </div>
    ),
    [],
  );
}
