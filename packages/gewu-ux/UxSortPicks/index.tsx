import { useRef, useState } from "react";
import { DivProps } from "react-override-props";
import { useClickBg } from "../hooks/useClick";
import { UxAlert } from "../UxAlert";
import { UxButton } from "../UxButton";
import { UxIconButton } from "../UxIconButton";
import { UxInput } from "../UxInput";
import { arrowIcon } from "../UxNativeSelect";
import { UxSortable } from "../UxSortable";
import { UxSvg } from "../UxSvg";

export type UxSortPicksProps = DivProps<{
  textClassName?: string;
  onChange?: (vals: string[]) => void;
  disabled?: boolean;
  addLabel?: string;
  value?: string[];
}>;

interface Item {
  id: string;
  value: string;
}

export function UxSortPicks({
  className,
  value,
  disabled,
  textClassName,
  onChange,
  addLabel = "add",
  children,
  ...rest
}: UxSortPicksProps) {
  if (!value) {
    value = ["A", "B"];
  }
  const ref = useRef<HTMLDivElement>(null);
  const [, downCss, clickEvents] = useClickBg();
  const [show, setShow] = useState(false);
  const [items, setItems] = useState<Item[]>(value.map((v, i) => ({ id: i + "", value: v })));

  const handleClick = () => {
    if (disabled) {
      return;
    }
    setShow(true);
  };
  const handleRemoveItem = (item: Item) => {
    const nextModel = [] as Item[];
    items.forEach((v) => {
      if (v.id !== item.id) {
        nextModel.push(v);
      }
    });
    setItems(nextModel);
  };

  return (
    <div ref={ref}>
      <div
        {...clickEvents}
        {...rest}
        className={[
          "pointer-events-auto",
          downCss,
          "inline-flex flex-row items-center rounded-lg py-2 px-2",
          disabled ? "pointer-events-none opacity-60" : "",
          className,
        ].join(" ")}
        onClick={handleClick}
      >
        <span className={textClassName}>{value && value.length ? value.join(", ") : children}</span>
        <UxSvg className="text-primary ml-1" src={arrowIcon}></UxSvg>
      </div>

      <UxAlert
        show={show}
        hiddenCancel
        buttonTestIds="sort_picks"
        onOk={() => {
          const nextValue = [] as string[];
          items.forEach((item) => {
            if (item.value) {
              nextValue.push(item.value);
            }
          });
          onChange && onChange(nextValue);
          setShow(false);
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center overflow-y-auto p-3 pb-0">
          <div className="w-full">
            <UxSortable groupClassName="space-y-3 mb-3" data={{ a: items }}>
              {({ drag, item }) => {
                return (
                  <div key={item.id} className="flex w-full flex-row items-center">
                    <UxInput
                      value={item.value}
                      test-id={"sort_picks_" + item.id}
                      className="w-full"
                      onInput={(e) => {
                        item.value = e.currentTarget.value;
                        setItems([...items]);
                      }}
                    />
                    <UxIconButton
                      className="text-primary ml-3 h-10 w-10 flex-shrink-0"
                      src="/icons/feather2/trash-2.svg"
                      onClick={() => {
                        handleRemoveItem(item);
                      }}
                    ></UxIconButton>
                    <UxIconButton
                      {...drag}
                      className="text-primary h-10 w-10 flex-shrink-0"
                      src="/icons/feather2/move.svg"
                    ></UxIconButton>
                  </div>
                );
              }}
            </UxSortable>

            <UxButton
              theme="def"
              test-id="sort_picks_add_item"
              className="w-full"
              onClick={() => {
                setItems([
                  ...items,
                  {
                    id: items.length + "",
                    value: "",
                  },
                ]);
              }}
            >
              {addLabel}
            </UxButton>
          </div>
        </div>
      </UxAlert>
    </div>
  );
}
