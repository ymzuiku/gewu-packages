import { ThemeType } from "../theme";
import { UxButton } from "../UxButton";
import { UxModal, UxModalProps } from "../UxModal";
import { UxRenderInBody } from "../UxRenderInBody";

interface UxModelButtonItem {
  label: string;
  src?: string;
  theme?: ThemeType;
  onClick?: (closeHandle: () => void) => void;
}

export interface UxModalButtonsProps extends UxModalProps {
  items: UxModelButtonItem[];
  className?: string;
  height?: string;
  cancel?: string;
  hiddenCancel?: boolean;
}

export function UxModalButtons({
  hiddenCancel,
  items,
  height,
  cancel,
  ignoreMaskClose = false,
  closeHandle,
  ...rest
}: UxModalButtonsProps) {
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
              className="space-y-3 overflow-y-auto p-3"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              {items.map((item) => {
                return (
                  <UxButton
                    theme={item.theme || "def"}
                    className="w-full"
                    key={item.label}
                    onClick={() => {
                      if (item.onClick) {
                        item.onClick(closeHandle!);
                      }
                    }}
                  >
                    {item.label}
                  </UxButton>
                );
              })}
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

UxModalButtons.Show = UxRenderInBody<UxModalButtonsProps>(UxModalButtons);
