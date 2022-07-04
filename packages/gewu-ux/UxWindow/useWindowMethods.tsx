import { useCallback, useRef } from "react";
import { UxWindowMethodRef } from ".";
import { UxAlert } from "../UxAlert";
import { UxInput } from "../UxInput";

interface useWindowMethodsProps {
  clearMemo: () => void;
  jumpToLabel: string;
  placeholder: string;
}

export function useWindowMethods(props: useWindowMethodsProps) {
  const uxWindowMethodRef = useRef<UxWindowMethodRef>({});

  const handleReload = () => {
    props.clearMemo();
    if (uxWindowMethodRef.current.fetcher) {
      uxWindowMethodRef.current.fetcher(0, true);
    }
  };

  const handleScrollTo = useCallback(() => {
    let top = "0";
    UxAlert.Show({
      render: ({ ok }) => {
        return (
          <form
            className="p-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (uxWindowMethodRef.current.scrollTo) {
                uxWindowMethodRef.current.scrollTo(Number(top), "start");
              }
              ok();
            }}
          >
            <h3 className="mb-3 text-center font-semibold">{props.jumpToLabel}</h3>
            <UxInput placeholder={props.placeholder} type="number" onChange={(e) => (top = e.currentTarget.value)} />
          </form>
        );
      },
      onOk: (hidden) => {
        if (uxWindowMethodRef.current.scrollTo) {
          uxWindowMethodRef.current.scrollTo(Number(top), "start");
        }
        hidden();
      },
    });
  }, [uxWindowMethodRef.current]);

  return {
    uxWindowMethodRef: uxWindowMethodRef,
    handleReload,
    handleScrollTo,
  };
}
