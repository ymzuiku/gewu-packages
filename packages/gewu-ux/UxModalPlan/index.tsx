import { UxButton } from "../UxButton";
import { UxModal, UxModalProps } from "../UxModal";
import { UxRenderInBody } from "../UxRenderInBody";

export interface UxModelPlanProps extends UxModalProps {
  className?: string;
  height?: string;
  hiddenCancel?: boolean;
  cancel?: string;
}

export function UxModelPlan({
  hiddenCancel,
  children,
  cancel = "cancel",
  height = "max-h-[calc(100vh-160px)]",
  ignoreMaskClose = false,
  closeHandle,
  ...rest
}: UxModelPlanProps) {
  return (
    <UxModal anime="from-bottom" ignoreMaskClose={ignoreMaskClose} closeHandle={closeHandle} {...rest}>
      <div className="flex h-full w-full flex-col items-center justify-center p-5">
        <div className="flex-1"></div>
        <div
          className={["bg-def w-full flex-shrink-0 rounded-xl", height].join(" ")}
          onClick={(e) => e.preventDefault()}
        >
          <div className="flex h-full flex-col">
            <div
              className="space-y-3 p-3"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {children}
              {!hiddenCancel && (
                <UxButton key="_cancel_" theme="def" className="w-full" onClick={closeHandle}>
                  {cancel}
                </UxButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </UxModal>
  );
}

UxModelPlan.Show = UxRenderInBody<UxModelPlanProps>(UxModelPlan);
