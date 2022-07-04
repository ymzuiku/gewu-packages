import { CSSProperties, DOMAttributes, ReactNode } from "react";
import { UxCard } from "../UxCard";

interface UxFormCardItem {
  label: string | (() => ReactNode);
  key?: string;
  required?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  disabled?: boolean;
  error?: string;
  ignore?: boolean;
  vertical?: boolean;
}

export interface UxFormCardProps extends DOMAttributes<HTMLElement> {
  disabled?: boolean;
  items: UxFormCardItem[];
  className?: string;
  error?: string;
  errorName?: string;
  space?: string;
  style?: CSSProperties;
}

export function UxFormItem({ vertical, disabled, children, error, label, required }: UxFormCardItem) {
  return (
    <div className="flex flex-col items-start">
      <div className={["flex w-full", vertical ? "flex-col" : "flex-row items-center justify-between"].join(" ")}>
        {typeof label === "string" ? (
          <div
            className={[
              "text-def w-32 flex-shrink-0 truncate",
              disabled && "text-weak",
              vertical ? "mb-2" : "mr-3",
            ].join(" ")}
          >
            {label}
            {required && !disabled ? " *" : ""}
          </div>
        ) : (
          label()
        )}
        {children}
      </div>
      {error && (
        <div className="flex w-full flex-row">
          <div className="mr-4 w-28"></div>
          <div className="text-danger ml-1 mt-1 flex-1 text-left text-sm">{error}</div>
        </div>
      )}
    </div>
  );
}

export function UxFormCard({
  disabled,
  className,
  items,
  error,
  errorName,
  space = "space-y-4",
  ...rest
}: UxFormCardProps) {
  return (
    <UxCard className={className} {...rest} cardClassName={space}>
      {items
        .filter((v) => !v.ignore)
        .map((item) => (
          <UxFormItem disabled={disabled} error={errorName === item.key ? error : ""} key={item.key} {...item} />
        ))}
    </UxCard>
  );
}
