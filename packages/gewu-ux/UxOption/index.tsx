import { UxCheckbox, UxCheckboxProps } from "../UxCheckbox";

const optionSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" class="feather feather-circle"><circle cx="12" cy="12" r="10"></circle></svg>`;

// export interface UxOption extends DOMAttributes<HTMLDivElement> {
//   className?: string;
//   name?: string;
//   disabled?: boolean;
//   theme?: ThemeType;
//   rounded?: string;
//   svg?: string;
//   size?: string;
//   onChanged?: (selected: boolean) => void;
// }

export function UxOption({ rounded = "rounded-full", ...rest }: UxCheckboxProps) {
  return <UxCheckbox rotate={false} svg={optionSvg} rounded={rounded} {...rest} />;
}
