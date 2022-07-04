import { CSSProperties } from "react";
import { useField } from "./useField";

export interface ErrorMessageProps {
  style?: CSSProperties;
}

export function ErrorMessage({ name }: { name: string }) {
  const ctx = useField(name, "error");
  return <>{ctx.error}</>;
}
