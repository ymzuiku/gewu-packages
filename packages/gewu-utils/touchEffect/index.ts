import { isPhone } from "../device";

function renderEffect(size: number, x: number, y: number) {
  const div = document.createElement("div");
  Object.assign(div.style, {
    borderRadius: "50%",
    background: "radial-gradient(hsla(var(--bg-primary),0.2) 20%, hsla(var(--bg-primary),1) 100%)",
    position: "fixed",
    zIndex: 9000,
    left: x - size / 2 + "px",
    top: y - size / 2 + "px",
    width: size + "px",
    height: size + "px",
    transition: "all 0.25s ease-out",
    transform: "scale(0)",
    pointerEvents: "none",
    opacity: "0.7",
  });
  document.body.append(div);
  requestAnimationFrame(() => {
    Object.assign(div.style, {
      transform: "scale(1)",
      opacity: "0",
    });
  });
  setTimeout(() => {
    div.remove();
  }, 300);
}

export function useTouchEffect(size = 32) {
  if (!isPhone()) {
    return;
  }
  window.addEventListener("touchstart", (e) => {
    const touch = e.changedTouches[0];
    if (touch) {
      renderEffect(size, touch.pageX, touch.pageY);
    }
  });
}
