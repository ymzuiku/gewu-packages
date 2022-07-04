import { DOMAttributes, useState } from "react";

export interface UxVideoProps extends DOMAttributes<HTMLElement> {
  src: string;
  className?: string;
}

export function UxVideo({ className, src, ...rest }: UxVideoProps) {
  const [showVideo, setShowVideo] = useState(false);
  return (
    <div className={["h-60 w-full overflow-hidden", className].join(" ")} {...rest}>
      <video
        onLoadedData={() => {
          setShowVideo(true);
        }}
        autoPlay
        loop
        muted
        className={["video-16-9", showVideo ? "opacity-100" : "opacity-0"].join(" ")}
        src={src}
      ></video>
    </div>
  );
}
