import { useState } from "react";
import { DivProps } from "react-override-props";
import { UxIconButton } from "../UxIconButton";

export type UxLightThemeChangeProps = DivProps<{
  className?: string;
}>;

const changeTheme = () => {
  const nextTheme = UxLightThemeChange.nowTheme === "dark" ? "light" : "dark";
  UxLightThemeChange.nowTheme = nextTheme;
  localStorage.setItem("theme", nextTheme);
  document.documentElement.setAttribute("data-theme", nextTheme);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function UxLightThemeChange({ ...rest }: UxLightThemeChangeProps) {
  const [theme, setTheme] = useState(UxLightThemeChange.nowTheme);

  const handleChange = () => {
    changeTheme();
    setTheme(UxLightThemeChange.nowTheme);
  };

  return (
    <UxIconButton
      src={theme === "dark" ? "/icons/feather2/moon.svg" : "/icons/feather2/sun.svg"}
      {...rest}
      onClick={handleChange}
    />
  );
}

UxLightThemeChange.nowTheme = (localStorage.getItem("theme") || "light") as "light" | "dark";
UxLightThemeChange.changeTheme = changeTheme;
