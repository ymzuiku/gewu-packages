import { DivProps } from "react-override-props";
import { UxButton } from "../UxButton";
import { UxModal, UxModalProps } from "../UxModal";
import { UxRenderInBody } from "../UxRenderInBody";

export type OkCancelButtonsProps = DivProps<{
  ok?: JSX.Element;
  cancel?: JSX.Element;
  closeHandle?: () => void;
  onOk?: (closeHandle: () => void) => void;
  height?: string;
  onCancel?: (closeHandle: () => void) => void;
  hiddenOk?: boolean;
  hiddenCancel?: boolean;
  className?: string;
  "test-id"?: string;
}>;

export type UxAlertProps = UxModalProps &
  OkCancelButtonsProps & {
    buttonTestIds?: string;
    className?: string;
  };

export function OkCancelButtons({
  closeHandle,
  ok = <>ok</>,
  cancel = <>cancel</>,
  onOk,
  onCancel,
  hiddenOk,
  hiddenCancel,
  "test-id": testId,
  ...rest
}: OkCancelButtonsProps) {
  return (
    <div {...rest}>
      {/* <div className="bottom-1px border-info border-opacity-20" /> */}
      <div className="flex flex-row p-3">
        {!hiddenCancel && (
          <UxButton
            type="button"
            theme="def"
            test-id={(testId || "alert") + "_cancel"}
            className="mr-2 flex-1 font-semibold"
            onClick={() => {
              if (onCancel) {
                onCancel(closeHandle!);
              } else if (closeHandle) {
                closeHandle();
              }
            }}
          >
            {cancel}
          </UxButton>
        )}
        {!hiddenOk && (
          <UxButton
            type="button"
            test-id={(testId || "alert") + "_ok"}
            className="flex-1 font-semibold"
            onClick={() => {
              onOk && onOk(closeHandle!);
            }}
          >
            {ok}
          </UxButton>
        )}
      </div>
    </div>
  );
}

export function UxAlert({
  children,
  ignoreMaskClose = true,
  closeHandle,
  ok,
  hiddenOk,
  onOk,
  onCancel,
  hiddenCancel,
  height,
  buttonTestIds,
  cancel,
  ...rest
}: UxAlertProps) {
  return (
    <UxModal ignoreMaskClose={ignoreMaskClose} closeHandle={closeHandle} {...rest}>
      <div className="flex h-full w-full flex-col items-center justify-center p-5">
        <div className={["bg-def w-full rounded-xl", height].join(" ")} onClick={(e) => e.preventDefault()}>
          <div className="flex h-full flex-col">
            <div className="flex-1 overflow-y-auto">{children}</div>
            <OkCancelButtons
              test-id={buttonTestIds}
              closeHandle={closeHandle}
              hiddenOk={hiddenOk}
              hiddenCancel={hiddenCancel}
              ok={ok}
              cancel={cancel}
              onOk={onOk}
              onCancel={onCancel}
            />
          </div>
        </div>
      </div>
    </UxModal>
  );
}

UxAlert.Show = UxRenderInBody<UxAlertProps>(UxAlert);
