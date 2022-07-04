import { DivProps } from "react-override-props";
import { UxHeader } from "../UxHeader";
import { UxTabbarFloat } from "../UxTabbar";

export type UxLayoutProps = DivProps<{
  name?: string;
  useHeader?: boolean;
  header?: JSX.Element;
  bottom?: JSX.Element;
  headerSpace?: number | boolean;
  bottomSpace?: number | boolean;
  notScroll?: boolean;
}>;

export function UxLayout({
  className,
  header,
  bottom,
  children,
  headerSpace,
  bottomSpace,
  notScroll,
  ...rest
}: UxLayoutProps) {
  return (
    <div className={[className, "relative h-full w-full"].join(" ")} {...rest}>
      {header}
      <div className={"relative flex h-full w-full flex-col"}>
        {headerSpace ? (
          typeof headerSpace === "number" ? (
            <div style={{ height: headerSpace }}></div>
          ) : (
            <UxHeader.Space />
          )
        ) : null}
        <div className={["w-full flex-1", notScroll ? "" : "overflow-y-auto"].join(" ")}>{children}</div>
        {bottomSpace ? (
          typeof bottomSpace === "number" ? (
            <div style={{ height: bottomSpace }}></div>
          ) : (
            <UxTabbarFloat.Space />
          )
        ) : null}
      </div>
      {bottom}
    </div>
  );
}
