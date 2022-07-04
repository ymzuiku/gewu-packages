export type ThemeType =
  | "def"
  | "weak"
  | "deep"
  | "info"
  | "input"
  | "primary"
  | "secondary"
  | "danger"
  | "warn"
  | "success";

export const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

// 仅仅是为了让 tailwind jit 解析并编译主题颜色
// eslint-disable-next-line no-constant-condition
if (false) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const bg = [
    "cursor-not-allowed",
    // text
    "text-def",
    "text-weak",
    "text-info",
    "text-deep",
    "text-primary",
    "text-secondary",
    "text-success",
    "text-danger",
    "text-warn",
    // bg
    "bg-def",
    "bg-weak",
    "bg-info",
    "bg-deep",
    "bg-primary",
    "bg-secondary",
    "bg-success",
    "bg-danger",
    "bg-warn",
    // border
    "border-def",
    "border-weak",
    "border-info",
    "border-deep",
    "border-primary",
    "border-secondary",
    "border-success",
    "border-danger",
    "border-warn",
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const front = [
    // text
    "text-front-def",
    "text-front-weak",
    "text-front-info",
    "text-front-deep",
    "text-front-primary",
    "text-front-secondary",
    "text-front-success",
    "text-front-danger",
    "text-front-warn",
    // bg
    "bg-front-def",
    "bg-front-weak",
    "bg-front-info",
    "bg-front-deep",
    "bg-front-primary",
    "bg-front-secondary",
    "bg-front-success",
    "bg-front-danger",
    "bg-front-warn",
    // border
    "border-front-def",
    "border-front-weak",
    "border-front-info",
    "border-front-deep",
    "border-front-primary",
    "border-front-secondary",
    "border-front-success",
    "border-front-danger",
    "border-front-warn",
  ];
}
