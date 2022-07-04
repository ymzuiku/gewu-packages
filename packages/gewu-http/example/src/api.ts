import { z } from "zod";
import { gewuHTTP } from "../../lib";

// 描述了请求体类型、响应类型、url、校验
export const get_hello = gewuHTTP.api({
  url: "/v1/hello",
  method: "GET",
  requestSchema: z.object({
    name: z.string({ required_error: "需要提供name" }),
    age: z.number({ required_error: "需要提供age" }).min(3, "太小"),
    fish: z.number().min(3, "太小"),
  }),
  responseSchema: z.object({
    name: z.string({ required_error: "需要返回name" }),
    age: z.number({ required_error: "需要返回age" }),
    vip: z.string({ required_error: "需要返回vip" }),
  }),
});

export const post_hello = gewuHTTP.api({
  url: "/v1/hello",
  method: "POST",
  requestSchema: z.object({
    name: z.string({ required_error: "需要提供name" }),
    age: z.number({ required_error: "需要提供age" }),
  }),
  responseSchema: z.object({
    name: z.string({ required_error: "需要返回name" }),
    age: z.number({ required_error: "需要返回age" }),
    vip: z.string({ required_error: "需要返回vip" }),
  }),
});
