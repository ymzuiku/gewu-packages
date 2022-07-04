import { isPhone } from "gewu-utils/device";

// interface activePseudoProps {
//   down: () => void;
//   up: () => void;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clickPseudo(down: () => void, up: () => void): any {
  if (isPhone()) {
    return {
      onTouchStart: () => {
        down();
      },
      onTouchEnd: () => {
        up();
      },
      onTouchCancel: () => {
        up();
      },
    };
  }
  return {
    onMouseDown: () => {
      down();
    },
    onMouseUp: () => {
      up();
    },
    onMouseOver: () => {
      up();
    },
  };
}
