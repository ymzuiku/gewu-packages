/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormProps } from "react-override-props";
import { SignleContext } from "./SingleContext";
import { FormContext } from "./useForm";

const SingleProvider = SignleContext.Provider;

export type LessFormProps = FormProps<{
  name?: string;
  value: FormContext<any>;
  children: any;
}>;

export function LessForm({ children, onSubmit, value, ...rest }: LessFormProps) {
  return (
    <SingleProvider value={value}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (onSubmit) {
            onSubmit(e);
          }
        }}
        {...rest}
      >
        {children}
      </form>
    </SingleProvider>
  );
}
