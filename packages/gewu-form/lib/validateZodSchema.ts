/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodFlat } from "zod-flat";
import { ValidateOptions } from "./useForm";

export function isZodSchema(schema: any): boolean {
  return !!(schema.safeParseAsync && schema.safeParse);
}

export async function validateZodSchema(schema: any, values: Record<string, any>, { key }: ValidateOptions = {}) {
  let error = "";
  let path = "";
  const errors: Record<string, string> = {};

  schema.safeParse;
  if (key) {
    try {
      zodFlat.pickParse(schema, key, values);
    } catch (e: any) {
      path = e.path;
      error = e.message;
    }
  } else {
    try {
      zodFlat.parse(schema, values);
    } catch (e: any) {
      path = e.path;
      error = e.message;
    }
  }
  return { errors, error, path };
}
