import { DivProps } from "react-override-props";
import { RenderChildrenProps, UxItemProps } from ".";

export type UxSingleGroupProps = DivProps<{
  value?: string;
  className?: string;
  items: UxItemProps[];
  onChange?: (value: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (props: RenderChildrenProps) => any;
}>;

export function UxSingleGroup({ value, onChange, items, children, ...rest }: UxSingleGroupProps) {
  const handleChange = (name: string) => {
    onChange && onChange(name);
  };
  return (
    <div {...rest}>
      {items.map((item) => {
        const props: RenderChildrenProps = {
          value: value == item.name,
          onChange: () => handleChange(item.name),
          key: item.name,
          name: item.name,
          label: item.label,
        };
        return children(props);
      })}
    </div>
  );
}
