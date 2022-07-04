import React, { useState } from "react";
import { DivProps } from "react-override-props";
import { UxBackButton } from "../UxBackButton";
import { UxIconButton } from "../UxIconButton";
import { UxSearchButton } from "../UxSearchButton";

export interface UxHeaderTool {
  src: string;
  img?: boolean;
  "test-id"?: string;
  onClick?: () => void;
}

export type UxHeaderProps = DivProps<{
  className?: string;
  height?: number;
  back?: string;
  shadow?: boolean;
  search?: string;
  searchLabel?: string;
  hidden?: boolean;
  border?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title?: any;
  onSearch?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  hiddenLeft?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tools?: (UxHeaderTool | undefined | null | (() => any))[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  leftTools?: (UxHeaderTool | undefined | null | (() => any))[];
}>;

export function UxHeader({
  className,
  back,
  children,
  height = UxHeader.options.height,
  shadow,
  border,
  tools,
  search,
  hidden,
  searchLabel,
  title,
  hiddenLeft,
  leftTools,
  onSearch,
  ...rest
}: UxHeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [n, setN] = useState(0);

  return (
    <>
      <div
        className={[
          "bg-def absolute top-0 z-50 w-full  transition-transform duration-200",
          UxHeader.options.blur,
          className,
          hidden ? "-translate-y-full" : "",
        ].join(" ")}
        {...rest}
        style={{ height: height }}
      >
        {children ? (
          children
        ) : (
          <div className="flex h-full w-full flex-row items-center">
            {!hiddenLeft && (
              <div className="text-primary flex-[5] flex-shrink-0">
                {back && <UxBackButton className="ml-1">{back}</UxBackButton>}
                {leftTools && (
                  <div className="ml-3 flex flex-row items-center justify-start space-x-1">
                    {leftTools.filter(Boolean).map((tool, i) => {
                      if (typeof tool === "function") {
                        const nextTool = tool();
                        if (nextTool && nextTool.src && nextTool.onClick) {
                          return (
                            <UxIconButton
                              key={(nextTool as UxHeaderTool).src}
                              {...(nextTool as UxHeaderTool)}
                              onClick={() => {
                                if (nextTool && nextTool.onClick) {
                                  nextTool.onClick();
                                  setN(n + 1);
                                }
                              }}
                            />
                          );
                        }
                        return <React.Fragment key={i}>{tool()}</React.Fragment>;
                      }
                      return (
                        <UxIconButton
                          key={(tool as UxHeaderTool).src}
                          {...(tool as UxHeaderTool)}
                          onClick={() => {
                            if (tool && tool.onClick) {
                              tool.onClick();
                              setN(n + 1);
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            )}
            {!showSearch && (
              <div className="flex flex-[10] flex-row items-center justify-center px-1 text-center font-bold">
                {title}
              </div>
            )}
            <div
              className={[
                "text-primary mr-3 flex flex-shrink-0 flex-row items-center justify-end space-x-1",
                showSearch ? "flex-[30]" : "flex-[5]",
              ].join(" ")}
            >
              {search && (
                <UxSearchButton
                  thin
                  onSetShow={(showSearch) => {
                    setShowSearch(showSearch);
                  }}
                  className="text-primary"
                  inputClassName="w-full"
                  search={searchLabel}
                  icon="/icons/feather2/search.svg"
                  onBlur={onSearch}
                  placeholder={search}
                />
              )}
              {tools &&
                tools.filter(Boolean).map((tool, i) => {
                  if (typeof tool === "function") {
                    const nextTool = tool();
                    if (nextTool && nextTool.src && nextTool.onClick) {
                      return (
                        <UxIconButton
                          className="flex-shrink-0"
                          key={(nextTool as UxHeaderTool)["test-id"] || (nextTool as UxHeaderTool).src}
                          {...(nextTool as UxHeaderTool)}
                          onClick={() => {
                            if (nextTool && nextTool.onClick) {
                              nextTool.onClick();
                              setN(n + 1);
                            }
                          }}
                        />
                      );
                    }
                    return <React.Fragment key={i}>{tool()}</React.Fragment>;
                  }
                  return (
                    <UxIconButton
                      className="flex-shrink-0"
                      key={(tool as UxHeaderTool)["test-id"] || (tool as UxHeaderTool).src}
                      {...(tool as UxHeaderTool)}
                      onClick={() => {
                        if (tool && tool.onClick) {
                          tool.onClick();
                          setN(n + 1);
                        }
                      }}
                    />
                  );
                })}
            </div>
          </div>
        )}
      </div>
      {shadow && (
        <div
          className={[
            "pointer-events-none absolute top-0 -left-[20vw] z-[49] w-[150vw] opacity-30 shadow-md transition-transform duration-200",
            hidden ? "-translate-y-full" : "",
          ].join(" ")}
          style={{ height: height }}
        />
      )}
      {border && (
        <div className={`bottom-1px absolute left-0 z-[50] w-full border-black/5`} style={{ top: height }}></div>
      )}
    </>
  );
}

UxHeader.Space = function UxHeaderSpace() {
  return <div style={{ height: UxHeader.options.height }}></div>;
};

UxHeader.options = {
  height: 56,
  // blur: "bg-opacity-[0.65] backdrop-blur-md",
  blur: "",
};
