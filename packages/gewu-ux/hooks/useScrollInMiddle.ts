import { useLayoutEffect, useState } from "react";

export const useScrollInMiddle = () => {
  const [hidden, seHidden] = useState(true);
  useLayoutEffect(() => {
    let lastHidden = true;
    let tick = false;
    const onScroll = () => {
      if (!tick) {
        window.requestAnimationFrame(() => {
          tick = false;
        });
        if (window.scrollY > 100) {
          if (lastHidden) {
            lastHidden = false;
            seHidden(lastHidden);
          }
        } else {
          if (!lastHidden) {
            lastHidden = true;
            seHidden(lastHidden);
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return !hidden;
};
