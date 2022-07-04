import { DivProps } from "react-override-props";
import { useClickScale } from "../hooks/useClick";
import { UxAlert } from "../UxAlert";
import { UxInput } from "../UxInput";

interface HslColor {
  h: string;
  s: string;
  l: string;
}

export type UxColorPickerProps = DivProps<{
  className?: string;
  onChange?: (color: string) => void;
  value?: string;
  width?: string;
}>;

function hslToString(color: HslColor) {
  const list: number[] = [];
  Object.keys(color).forEach((k, i) => {
    if (i < 4) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      list.push((color as any)[k]);
    }
  });
  return list.join(",");
}

function stringToHsl(color?: string): HslColor | undefined {
  if (!color) {
    return void 0;
  }
  const list = color.split(",");
  if (list.length !== 3) {
    return void 0;
  }
  return {
    h: list[0] || "0",
    s: list[1] || "0%",
    l: list[2] || "0%",
  };
}

export function UxColorPicker({ className, width = "w-20", value = "0,0%,0%", onChange, ...rest }: UxColorPickerProps) {
  const [, clickCss, clickEvents] = useClickScale();
  const nowColor = stringToHsl(value) || { h: "0", s: "0%", l: "0%" };

  const handleShow = async () => {
    let nextColor = { ...nowColor };
    const oldColor = value;
    const { HslColorPicker } = await import("react-colorful");
    const isOk = await UxAlert.Show({
      render: () => {
        let ele: HTMLDivElement;
        let input: HTMLInputElement;
        return (
          <div className="my-picker flex w-full flex-col items-center justify-center p-6">
            <HslColorPicker
              className="h-full w-full"
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              color={nowColor as any}
              onChange={(v) => {
                nextColor = {
                  h: v.h + "",
                  s: v.s + "%",
                  l: v.l + "%",
                };
                const colorText = `${nextColor.h},${nextColor.s},${nextColor.l}`;
                onChange && onChange(colorText);
                if (!ele) {
                  ele = document.body.querySelector(".uxalert-color") as HTMLDivElement;
                }
                if (!input) {
                  input = document.body.querySelector(".uxalert-color-label input") as HTMLInputElement;
                }

                if (ele && input) {
                  ele.style.background = `hsl(${colorText})`;
                  input.value = colorText;
                }
              }}
            />
            <div className="mt-4 flex w-full flex-row items-center justify-between">
              <div
                className={["uxalert-color", "mr-4 h-10 overflow-hidden rounded-md", width, className].join(" ")}
                style={{
                  background: `hsl(${hslToString(nextColor)})`,
                }}
              ></div>
              <UxInput
                placeholder="HSL"
                onChange={(e) => {
                  const v = e.currentTarget.value;
                  const theColor = stringToHsl(v);
                  if (theColor) {
                    nextColor = theColor;
                    onChange && onChange(v);
                  }
                }}
                value={hslToString(nextColor)}
                className="uxalert-color-label w-full"
              ></UxInput>
            </div>
          </div>
        );
      },
    });
    if (isOk) {
      const colorStr = hslToString(nextColor);
      onChange && onChange(colorStr);
    } else {
      onChange && onChange(oldColor);
    }
  };

  return (
    <div
      className={["h-10 overflow-hidden rounded-md border-2 border-white p-0 shadow", width, clickCss, className].join(
        " ",
      )}
      style={{
        background: `hsl(${hslToString(nowColor)})`,
      }}
      onClick={handleShow}
      {...clickEvents}
      {...rest}
    ></div>
  );
}
