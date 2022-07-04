/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormContext, ValidateOptions } from "./useForm";
import { isYupSchema, validateYupSchema } from "./validateYupSchema";
import { isZodSchema, validateZodSchema } from "./validateZodSchema";

function checkTouched(formOb: FormContext<any>, errors: Record<string, string>) {
  // 正常情况下，只显示点击过的错误
  const nextErrors = {} as Partial<Record<keyof any, string>>;
  Object.keys(formOb.touched).forEach((key) => {
    if ((formOb.touched as any)[key]) {
      const err = (errors as any)[key];
      if (err !== void 0) {
        (nextErrors as any)[key] = err;
      }
    }
  });
  return nextErrors;
}

export async function updator(ctx: FormContext<any>, options: ValidateOptions = {}) {
  if (ctx.validate) {
    const errors: any = await Promise.resolve(ctx.validate(ctx.val, options.key));
    Object.assign(ctx.errors, checkTouched(ctx, errors));
  } else if (ctx.validateSchema) {
    const schema = ctx.validateSchema;
    // 兼容 yup 的校验
    let res: any;

    if (isZodSchema(schema)) {
      // const vals = {} as any;
      // Object.keys(schema.fields).forEach((key: string) => {
      //   vals[key] = getin(ctx.val, key);
      // });
      res = await validateZodSchema(schema, ctx.val, {
        ...options,
      });
    } else if (isYupSchema(schema)) {
      // const vals = {} as any;
      // Object.keys(schema.fields).forEach((key: string) => {
      //   vals[key] = getin(ctx.val, key);
      // });
      res = await validateYupSchema(schema, ctx.val, {
        ...options,
      });
    }

    if (options.key) {
      ctx.errors[options.key] = res.error;
    } else {
      ctx.errors = checkTouched(ctx, res.errors);
    }

    if (res.error) {
      ctx.error = res.error;
      ctx.errorPath = res.path;
    }
  }
  ctx.next();
}
