import { useEffect, useRef } from "react";
import { HTMLProps } from "react-override-props";
import { BallProps, renderCanvas } from "./renderCanvas";

export type UxBall3dProps = HTMLProps<{ name?: string }> & BallProps;

// renderCanvas
export function UxBall3d({ className, dotRad, rad, lat, lon, pi, rotationSpeed, ...rest }: UxBall3dProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const clear = renderCanvas({ canvas: ref.current, rad, dotRad, lat, lon, pi, rotationSpeed });
    // 30秒后停止旋转
    setTimeout(() => {
      clear();
    }, 1000 * 30);
    return clear;
  }, []);
  return <canvas className={className} {...rest} ref={ref}></canvas>;
}
