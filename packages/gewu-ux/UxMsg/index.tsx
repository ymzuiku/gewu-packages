import { DivProps } from "react-override-props";
import { CSSTransition } from "../deps/CSSTransition";
import { ThemeType } from "../theme";
import { UxRenderInBody, UxRenderInBodyProps } from "../UxRenderInBody";

export type UxMessageProps = DivProps<{
  show: boolean;
  closeHandle?: () => void;
  theme?: ThemeType;
}> &
  UxRenderInBodyProps;

export function UxMsg({ show, children, closeHandle, theme = "danger" }: UxMessageProps) {
  return (
    <CSSTransition timeout={UxRenderInBody.options.timeout} unmountOnExit in={show} classNames="uxmodal-from-top">
      <div className="pointer-events-none fixed top-5 left-0 z-[900] flex w-full flex-col items-center px-5">
        <div
          test-id={typeof children === "string" ? children : "uxmsg"}
          className={[
            "pointer-events-auto mx-auto cursor-pointer rounded py-3 px-5 shadow-xl",
            `bg-${theme} text-front-${theme}`,
          ].join(" ")}
          onClick={closeHandle}
        >
          {children}
        </div>
      </div>
    </CSSTransition>
  );
}

UxMsg.options = {
  autoRemove: 5000,
};
UxMsg.Show = UxRenderInBody<UxMessageProps>(UxMsg, UxRenderInBody.options.timeout, UxMsg.options.autoRemove);
UxMsg.Error = (err: string | Error) => {
  if (typeof err === "object") {
    err = err.message;
  }
  if (!err) {
    return;
  }

  UxMsg.Show({
    render: () => err,
  });
};

UxMsg.Success = (success: string | Error) => {
  if (typeof success === "object") {
    success = success.message;
  }
  if (!success) {
    return;
  }

  UxMsg.Show({ theme: "primary", autoRemove: 1000, render: () => success });
};
