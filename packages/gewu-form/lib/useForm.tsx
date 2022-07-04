/* eslint-disable @typescript-eslint/no-explicit-any */
import { CreateObserver, ObControl } from "gewu-ob";
import { useMemo, useRef } from "react";
import { updator } from "./updator";

export interface ValidateOptions {
  key?: string;
  first?: boolean;
  // typeChange?: boolean;
}

interface ConfigToContext<T> {
  validate?: (values: T, changeName?: string) => Promise<Partial<Record<keyof T, string>>>;
  validateSchema?: any;
  // 返回新的values，以实现联动
  handleChange?: (values: T, name: string) => T;
}

export interface FormObConfig<T> extends ConfigToContext<T> {
  initialValues: T;
}

export interface FormContext<T> extends ObControl<T>, ConfigToContext<T> {
  errors: Partial<Record<keyof T, string>>;
  error: string;
  errorPath: string;
  touched: Record<keyof T, boolean>;
  /** 验证所有参数，并且返回遇到的第一个错误 */
  isValid: (opt?: ValidateOptions) => string;
}

export type FormContextAny = FormContext<any>;

export function useForm<T>({ initialValues, validate, validateSchema, handleChange }: FormObConfig<T>): FormContext<T> {
  const ref = useRef<any>(CreateObserver(initialValues));

  return useMemo(() => {
    const fields = Object.keys(initialValues);
    const touched = {} as Record<keyof T, boolean>;
    fields.forEach((key) => {
      (touched as any)[key] = false;
    });

    ref.current = {
      ...ref.current,
      validate,
      isValid: (opt: ValidateOptions = {}) => {
        updator(ref.current, opt);
        return ref.current.error;
      },
      errors: {},
      error: "",
      touched,
      validateSchema,
      handleChange,
    };

    return ref.current;
  }, []);
}
