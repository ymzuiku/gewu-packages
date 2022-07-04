/* eslint-disable @typescript-eslint/no-explicit-any */
import { DivProps } from "react-override-props";
import { UxMultipleGroup } from "./UxMultipleGroup";
import { UxSingleGroup } from "./UxSingleGroup";

export { UxMultipleGroup, UxSingleGroup };

export interface UxItemProps {
  label: string;
  name: string;
}

export interface RenderChildrenProps {
  value: boolean;
  onChange: () => void;
  key: string;
  name: string;
  label: string;
}

export type UxGroupProps = DivProps<{
  items: UxItemProps[];
  multiple?: boolean;
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  children: (props: RenderChildrenProps) => any;
}>;

export function UxGroup({ multiple, ...rest }: UxGroupProps) {
  if (multiple) {
    return <UxMultipleGroup {...(rest as any)} />;
  }
  return <UxSingleGroup {...(rest as any)} />;
}
