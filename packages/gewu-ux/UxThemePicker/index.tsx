import { CSSProperties, DOMAttributes, useEffect, useState } from "react";
import { UxColorPicker } from "../UxColorPicker";

export interface UxThemePickerProps extends DOMAttributes<HTMLElement> {
  className?: string;
  style?: CSSProperties;
  dark?: boolean;
}

export function UxThemePicker({ dark, className, ...rest }: UxThemePickerProps) {
  const themeColors = {
    primary: document.body.style.getPropertyValue("--bg-primary") || (dark ? "218,83%,54%" : "218,83%,54%"),
    secondary: document.body.style.getPropertyValue("--bg-secondary") || (dark ? "140,50%,50%" : "140,50%,50%"),
    weak: document.body.style.getPropertyValue("--bg-weak") || (dark ? " 0,0%,5%" : "240,24%,95%"),
    input: document.body.style.getPropertyValue("--bg-input") || (dark ? "240,2%,14%" : "240,5%,96%"),
    info: document.body.style.getPropertyValue("--bg-info") || (dark ? "240,3%,16%" : "240,11%,98%"),
    def: document.body.style.getPropertyValue("--bg-def") || (dark ? " 0,0%,8%" : "240,11%,100%"),
    deep: document.body.style.getPropertyValue("--bg-deep") || (dark ? "0,0%,100%" : "240,11%,0%"),
  };

  const themeKeys = Object.keys(themeColors) as [keyof typeof themeColors];

  const setTheme = (theme: keyof typeof themeColors, hsl: string) => {
    themeColors[theme] = hsl;
    if (theme === "def") {
      document.body.style.setProperty("--bg-" + theme, hsl);
      const l = hsl.split(",")[2];
      if (l) {
        const light = Number(l.replace("%", ""));
        if (light > 50) {
          document.body.style.setProperty("--text-" + theme, "0,0%,0%");
        } else {
          document.body.style.setProperty("--text-" + theme, "0,0%,100%");
        }
      }
      return;
    }
    if (theme === "deep") {
      document.body.style.setProperty("--bg-" + theme, hsl);
      const l = hsl.split(",")[2];
      if (l) {
        const light = Number(l.replace("%", ""));
        if (light > 50) {
          document.body.style.setProperty("--text-" + theme, "0,0%,100%");
        } else {
          document.body.style.setProperty("--text-" + theme, "0,0%,0%");
        }
      }
      return;
    }
    document.body.style.setProperty("--bg-" + theme, hsl);
    document.body.style.setProperty("--text-" + theme, hsl);
    document.body.style.setProperty("--border-" + theme, hsl);
  };

  useEffect(() => {
    setThemes(themeColors);
  }, [dark]);

  const [n, setN] = useState(0);
  const [themes, setThemes] = useState(themeColors);
  return (
    <div className={["space-y-3", className].join(" ")} {...rest}>
      <div>Change Theme</div>
      {themeKeys.map((key) => {
        return (
          <div key={key} className="flex flex-row items-center justify-between">
            <span className="font-semibold">{key.toUpperCase()}</span>
            <UxColorPicker
              value={themes[key]}
              name={key}
              onChange={(v) => {
                setTheme(key, v);
                setThemes({ ...themeColors });
                setN(n + 1);
              }}
            ></UxColorPicker>
          </div>
        );
      })}
    </div>
  );
}
