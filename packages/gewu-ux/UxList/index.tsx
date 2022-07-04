import { DivProps } from "react-override-props";
import { useScroll } from "../hooks/useScroll";
import { UxIconButton } from "../UxIconButton";
import { UxLoading } from "../UxLoading";

export type UxListProps = DivProps<{
  onBottom?: () => void;
  loading?: boolean;
  topLabel?: string;
  bottomEnd?: boolean;
  endLabel?: string;
  onReload?: () => void;
}>;

// const envSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width=".5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-git-commit"><circle cx="12" cy="12" r="4"></circle><path d="M1.05 12H7m10.01 0h5.95"></path></svg>`;

export function UxList({
  loading,
  className,
  children,
  topLabel,
  onBottom,
  bottomEnd,
  endLabel,
  onReload,
  ...rest
}: UxListProps) {
  useScroll(onBottom);
  return (
    <>
      {topLabel && (
        <div className="flex h-[54px] flex-row items-center justify-between p-3 pb-0">
          <div className="text-info  ml-1">{topLabel}</div>
          {onReload && (
            <UxIconButton className="text-info h-12 w-12" src="/icons/iconfont/refresh 136.svg" onClick={onReload} />
          )}
        </div>
      )}
      <div className={[className].join(" ")} {...rest}>
        {children}
      </div>
      <div className="pt-3 pb-28">
        {bottomEnd ? (
          <div className="text-info mx-auto pt-3 text-center text-sm">{endLabel}</div>
        ) : (
          loading && <UxLoading />
        )}
      </div>
    </>
  );
}
