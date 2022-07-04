import { CSSProperties } from "react";
import { DivProps } from "react-override-props";
import { useClickScale } from "../hooks/useClick";

export type UxCardProps = DivProps<{
  cardStyle?: CSSProperties;
  cardClassName?: string;
  noClickScale?: boolean;
}>;

export function UxCard({ noClickScale, className, children, cardClassName, cardStyle, ...rest }: UxCardProps) {
  const [, clickCss, clickEvents] = useClickScale();
  return (
    <div
      className={["relative px-3", className, !noClickScale && rest.onClick && clickCss].join(" ")}
      {...(noClickScale ? {} : clickEvents)}
      {...rest}
    >
      <div className={["bg-def rounded-xl p-3", cardClassName].join(" ")} style={cardStyle}>
        {children}
      </div>
    </div>
  );
}
