import { useEffect } from "react";
import { DivProps } from "react-override-props";
import { CSSTransition } from "../deps/CSSTransition";
import { UxRenderInBody, UxRenderInBodyProps } from "../UxRenderInBody";
import "./index.css";

export type UxModalProps = DivProps<{
  show: boolean;
  zIndex?: number;
  anime?: "scale" | "from-top" | "from-bottom" | "from-left" | "from-right";
  closeHandle?: () => void;
  className?: string;
  ignoreMaskClose?: boolean;
}> &
  UxRenderInBodyProps;

let stacks = 0;

export function UxModal({
  zIndex = 200,
  show,
  closeHandle,
  className,
  ignoreMaskClose,
  children,
  anime = "scale",
}: UxModalProps) {
  useEffect(() => {
    stacks += 1;
    return () => {
      stacks -= 1;
    };
  });
  return (
    <>
      <CSSTransition
        unmountOnExit
        in={show}
        timeout={UxRenderInBody.options.timeout}
        classNames={UxRenderInBody.options.anime ? "uxmodal-bg" : ""}
      >
        <div
          className={`fixed left-0 top-0 h-full w-full bg-black bg-opacity-30 will-change-auto`}
          style={{ zIndex: zIndex + stacks * 100 }}
          onClick={() => {
            if (!ignoreMaskClose && closeHandle) {
              closeHandle();
            }
          }}
          onTouchMove={(e) => e.preventDefault()}
        ></div>
      </CSSTransition>
      <CSSTransition
        unmountOnExit
        in={show}
        timeout={300}
        classNames={UxRenderInBody.options.anime ? "uxmodal-" + anime : ""}
      >
        <div
          className={[`fixed left-0 top-0 h-full w-full will-change-auto`, className].join(" ")}
          style={{
            zIndex: zIndex + 1 + stacks * 100,
          }}
          // onTouchMove={(e) => e.preventDefault()}
          onClick={() => {
            if (!ignoreMaskClose && closeHandle) {
              closeHandle();
            }
          }}
        >
          {children}
        </div>
      </CSSTransition>
    </>
  );
}

UxModal.Show = UxRenderInBody<UxModalProps>(UxModal);
