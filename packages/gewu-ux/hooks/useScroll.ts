import { useEffect } from "react";

export function useScroll(onBottom?: () => void, onTop?: () => void) {
  useEffect(() => {
    let tick = false;
    const handleScroll = () => {
      if (!tick) {
        tick = true;
        window.requestAnimationFrame(() => {
          tick = false;
        });
        if (onBottom && window.scrollY > document.body.scrollHeight - document.body.clientHeight - 1) {
          onBottom();
        }
        if (onTop && window.scrollY < 1) {
          onTop();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [onBottom, onTop]);
}
