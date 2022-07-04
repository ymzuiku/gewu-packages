import { useState } from "react";
import { clickPseudo } from "./clickPseudo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useClick(): [boolean, Record<string, any>] {
  const [isDown, setIsDown] = useState(false);
  const down = () => {
    setIsDown(true);
  };
  const up = () => {
    setIsDown(false);
  };

  return [isDown, clickPseudo(down, up)];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useClickBg(theme = "deep"): [boolean, string, Record<string, any>] {
  const [isDown, setIsDown] = useClick();
  return [
    isDown,
    isDown ? `bg-${theme} bg-opacity-10 will-change-transform cursor-pointer` : "will-change-transform cursor-pointer",
    setIsDown,
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useClickOpacity(): [boolean, string, Record<string, any>] {
  const [isDown, setIsDown] = useClick();
  return [
    isDown,
    isDown ? `opacity-50 will-change-transform cursor-pointer` : "opacity-100 will-change-transform cursor-pointer",
    setIsDown,
  ];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useClickScale(): [boolean, string, Record<string, any>] {
  const [isDown, setIsDown] = useClick();
  return [
    isDown,
    isDown
      ? // ? "will-change-transform duration-100 scale-x-[0.99] scale-y-[0.97] opacity-[0.85]"
        "will-change-transform duration-100 translate-y-[2px] opacity-[0.85] cursor-pointer"
      : "duration-100 will-change-transform cursor-pointer",
    setIsDown,
  ];
}
