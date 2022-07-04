import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

// 只要组件props满足以下3个参数即可
export interface UxRenderInBodyProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (props: { cancel: () => void; ok: () => void }) => any;
  autoRemove?: number;
  closeHandle?: () => void;
}

// 将一个组件，渲染到 body 中，并且使用 promise 监听它被关闭
export function UxRenderInBody<T extends UxRenderInBodyProps>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: any,
  timeout = UxRenderInBody.options.timeout,
  autoRemove?: number,
) {
  const ShowComponent = ({
    promiseRes,
    render: Render,
    ...rest
  }: Partial<T> & { promiseRes: (ok: boolean) => void }) => {
    const [show, setShow] = useState(false);
    autoRemove = rest.autoRemove || autoRemove;
    useEffect(() => {
      setShow(true);
      if (autoRemove) {
        setTimeout(() => {
          setShow(false);
          promiseRes(false);
        }, autoRemove);
      }
    }, []);
    const onCancel = () => {
      setShow(false);
      promiseRes(false);
    };
    const onOk = () => {
      setShow(false);
      promiseRes(true);
    };
    return (
      <Component show={show} closeHandle={onCancel} onCancel={onCancel} onOk={onOk} {...rest}>
        {Render && Render({ cancel: onCancel, ok: onOk })}
      </Component>
    );
  };

  return async (props: Partial<T>) => {
    const out = document.createElement("div");
    document.body.append(out);
    const isOk = await new Promise<boolean>((res) => {
      createRoot(out).render(<ShowComponent promiseRes={res} {...props} />);
    });

    setTimeout(() => {
      if (out.parentElement) {
        out.remove();
      }
    }, timeout);

    return isOk;
  };
}

UxRenderInBody.options = {
  anime: true,
  timeout: 300,
  autoRemove: 1000 * 60 * 60 * 24,
};
