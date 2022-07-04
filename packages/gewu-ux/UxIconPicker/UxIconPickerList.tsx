/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchOnce } from "gewu-utils/fetchOnce";
import { useEffect, useRef, useState } from "react";
import { FixedSizeList } from "react-window";
import { useClickScale } from "../hooks/useClick";
import { UxBackButton } from "../UxBackButton";
import { UxButton } from "../UxButton";
import { UxCell } from "../UxCell";
import { UxInput } from "../UxInput";
import { UxLoading } from "../UxLoading";
import { UxSvg } from "../UxSvg";

let items: Record<string, string[]> = {};

const FixedSizeListAny = FixedSizeList as any;

function Item({
  second,
  onChanged,
  empty,
  src,
  selected,
  style,
}: {
  onChanged: (src: string) => void;
  second?: boolean;
  empty?: boolean;
  selected: boolean;
  src: string;
  style: React.CSSProperties;
}) {
  const strs = src.split("/");
  const name = strs[strs.length - 1].replace(".svg", "");
  const [, clickCss, clickEvent] = useClickScale();
  return (
    <div
      test-id={"icon_item_" + name}
      className={[
        "bg-def relative flex h-full w-full flex-row items-center",
        selected ? "text-primary" : "text-def",
        second ? "ml-2" : "",
        empty ? "pointer-events-none" : "",
        clickCss,
      ].join(" ")}
      {...clickEvent}
      onClick={() => {
        if (empty) {
          return;
        }
        onChanged(src);
      }}
      style={style}
    >
      <div className="w-16">
        <UxSvg className="pointer-events-none mx-2 h-12 w-12 p-1" src={src}></UxSvg>
      </div>
      <span className="text-info pointer-events-none flex-1">{name}</span>
      <UxSvg className="my-auto h-7 w-7 opacity-50" src="/icons/feather2/chevron-right.svg"></UxSvg>
      <div className="bottom-1px border-info absolute bottom-0 left-0 w-full"></div>
    </div>
  );
}

export function UxIconPickerList({
  value: baseValue,
  onChanged,
  handleClose,
  "test-id": testId,
  cancel = "cancel",
  placeholder = "Search",
}: {
  value: string;
  cancel?: string;
  placeholder?: string;
  "test-id"?: string;
  onChanged: (src: string) => void;
  handleClose: () => void;
}) {
  const [loading, setLoading] = useState(!items.length);
  const dirKeys = useRef<string[]>([]);
  const [search, setSearch] = useState("");
  const [value, setValue] = useState(baseValue);
  const [realItems, setItems] = useState(items[""]);
  const [subDir, setSubDir] = useState("");
  useEffect(() => {
    if (!items.length) {
      fetchOnce("/icons.json").then((res) => {
        items = JSON.parse(res);
        dirKeys.current = Object.keys(items);
        setItems(items[subDir]);
        setLoading(false);
      });
    }
  }, [subDir]);

  const handleChange = (src: string) => {
    setValue(src);
    onChanged(src);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearch = (e: any) => {
    if (e && e.currentTarget) {
      const v = e.currentTarget.value;
      setSearch(v);
      if (!v) {
        setItems(items[subDir]);
        return;
      }
      const nextItems = items[subDir].filter((item) => {
        return item.indexOf(v) > -1;
      });
      setItems(nextItems);
    }
  };

  return (
    <div className="pointer-events-none flex h-full w-full flex-col items-center justify-center overflow-y-auto px-3">
      <div
        className="bg-weak pointer-events-auto flex w-full flex-col items-center justify-start overflow-y-auto rounded-md"
        onClick={(e) => e.preventDefault()}
      >
        {loading && <UxLoading />}
        {!subDir && dirKeys.current.length && (
          <FixedSizeListAny height={600} itemSize={60} itemCount={dirKeys.current.length} width={"100%"}>
            {({ index, style }: any) => {
              const dir = dirKeys.current[index];
              return (
                <UxCell
                  test-id={"cell_" + dir}
                  key={dir}
                  line
                  style={style}
                  className="bg-def"
                  onClick={() => {
                    setSubDir(dir);
                  }}
                >
                  <UxSvg className="mr-3 h-8 w-8" src={dir === "emoji-tw" ? items[dir][400] : items[dir][0]}></UxSvg>
                  <span>{`${dir} (${items[dir].length})`}</span>
                </UxCell>
              );
            }}
          </FixedSizeListAny>
        )}
        {!loading && subDir && realItems && (
          <>
            <div className="flex w-full flex-row items-center justify-start">
              <UxBackButton
                className="ml-3"
                onClick={() => {
                  setSubDir("");
                  setItems(items[subDir]);
                }}
              />
              <UxInput
                test-id={testId + "_search"}
                value={search}
                // icon="/icons/feather2/search.svg"
                onChange={handleSearch}
                className="h-[50px] w-full"
                placeholder={placeholder}
              />
            </div>
            <FixedSizeListAny height={550} itemSize={60} itemCount={realItems.length} width={"100%"}>
              {({ index, style }: any) => (
                <Item
                  key={realItems[index]}
                  style={style}
                  selected={realItems[index] === value}
                  src={realItems[index]}
                  onChanged={handleChange}
                />
              )}
            </FixedSizeListAny>
          </>
        )}
        <div className="w-full p-2">
          <UxButton theme="def" className="w-full" onClick={handleClose}>
            {cancel}
          </UxButton>
        </div>
      </div>
    </div>
  );
}
