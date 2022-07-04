import { DivProps } from "react-override-props";
import { RenderChildrenProps, UxItemProps } from ".";

export type UxMultipleGroupProps = DivProps<{
  value?: string[];
  className?: string;
  items: UxItemProps[];
  onChange?: (value: string[]) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: (props: RenderChildrenProps) => any;
}>;

export function UxMultipleGroup({ value, onChange, children, items, ...rest }: UxMultipleGroupProps) {
  const set = new Set(typeof value === "string" ? [value] : value);
  const handleChange = (name: string) => {
    if (set.has(name)) {
      set.delete(name);
    } else {
      set.add(name);
    }
    onChange && onChange(Array.from(set).filter((v) => v !== null && v !== "" && v !== void 0));
  };
  return (
    <div {...rest}>
      {items.map((item) => {
        const props: RenderChildrenProps = {
          value: set.has(item.name),
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
