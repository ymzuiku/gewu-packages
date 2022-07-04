import { waitGet } from "gewu-utils/waitGet";
import { useEffect, useRef, useState } from "react";

export function useRect<T extends HTMLElement>(timeout = 30): [React.RefObject<T>, DOMRect] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const boxRef = useRef<T>(null);
  const [rect, setRect] = useState<DOMRect>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
    bottom: 0,
    left: 0,
    right: 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);

  useEffect(() => {
    setTimeout(() => {
      waitGet(() => {
        if (boxRef.current) {
          const box = boxRef.current;
          const rect = box.getBoundingClientRect();
          if (rect && rect.height > 0) {
            return rect;
          }
        }
      }, 2000).then((rect) => {
        if (rect) {
          requestAnimationFrame(() => {
            setRect(rect);
          });
        }
        return rect;
      });
    }, timeout);
  }, []);

  return [boxRef, rect];
}
