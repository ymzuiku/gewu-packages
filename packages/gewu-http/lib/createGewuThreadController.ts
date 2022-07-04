import { ZodSchema } from "zod";
import { API } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function creategopoolController(gopool: any) {
  return <T extends ZodSchema, O extends ZodSchema>(api: API<T, O>, service: (body: T) => Promise<O>) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gopool[api.method.toLowerCase() as "get" | "post" | "delete" | "put"](api.url, ({ body }: any) => service(body));
  };
}
