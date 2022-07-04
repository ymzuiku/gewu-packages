import { zodFlat } from "zod-flat";

export * from "./ErrorMessage";
export * from "./Field";
export * from "./FieldHOC";
export * from "./LessForm";
export * from "./useField";
export * from "./useForm";

export const setZodI18n = (i18n: Record<string, unknown>) => {
  zodFlat.i18n = i18n;
};
