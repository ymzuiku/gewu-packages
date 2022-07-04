import { ZodSchema } from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type Method = "GET" | "POST" | "DELETE" | "PUT";
// 前端用于请求的接口
export type Fetcher = <T extends ZodSchema, O extends ZodSchema>(
  api: API<T, O>,
  body: T,
  options?: RequestInit,
) => Promise<O>;
// 后端用于声明api的接口
export type Controller = <T extends ZodSchema, O extends ZodSchema>(
  api: API<T, O>,
  service: (body: T) => Promise<O>,
) => (body: T) => Promise<O>;
// 用于校验和过滤参数的接口
export type DtoValidate = <T>(schema: any, body: T) => T;
export type OnError = (error: Error) => void;

export interface APIProps<Req extends ZodSchema, Res extends ZodSchema> {
  requestSchema: Req;
  responseSchema: Res;
  url: string;
  method: Method;
  use: (server: (body: Zod.infer<Req>) => Promise<Zod.infer<Res>>) => (body: Zod.infer<Req>) => Promise<Zod.infer<Res>>;
  // typeofFn: (body: Zod.infer<Req>) => Promise<Zod.infer<Res>>;
}

// 前后端通用的接口描述
export interface API<Req extends ZodSchema, Res extends ZodSchema> extends APIProps<Req, Res> {
  (
    body: Zod.infer<Req>,
    getter?: (body: Zod.infer<Req>, api: API<Req, Res>, options?: any) => Promise<Zod.infer<Res>>,
  ): Promise<Zod.infer<Res>>;
}
