import { ZodSchema } from "zod";
import { zodFlat } from "zod-flat";
import { fetcher } from "./fetcher";
import { API, APIProps, Fetcher } from "./types";

export { fetcher };

/* eslint-disable @typescript-eslint/no-explicit-any */
const needBindServices: { api: API<any, any>; service: any }[] = [];

// 创建前后端公用接口类型
const api = <T extends ZodSchema, O extends ZodSchema>({
  method,
  requestSchema,
  responseSchema,
  url,
}: Omit<APIProps<T, O>, "use">): API<T, O> => {
  const api = async (body: any, getter?: any, options?: any) => {
    getter = getter || gewuHTTP.baseFetcher;
    if (!getter) {
      throw new Error("Not found fetcher: " + api.url);
    }
    try {
      body = zodFlat.parse(requestSchema, body);
    } catch (err) {
      gewuHTTP.onRequireError && gewuHTTP.onRequireError(err);
      throw err;
    }
    const res = await getter(body, api, options);

    return res;
  };
  api.requestSchema = requestSchema;
  api.responseSchema = responseSchema;
  api.url = url;
  api.method = method;
  api.typeofFn = null as any;
  api.use = (service: any) => {
    needBindServices.push({ api, service });
    return service;
  };
  return api;
};

export const gewuHTTP = {
  api,
  // use,
  // baseDtoValidate: yupDtoValidate,
  baseFetcher: fetcher as Fetcher,
  onRequireError: void 0 as any,
  onResponseError: void 0 as any,
  useControllers: (use: (api: API<any, any>, service: any) => void) => {
    needBindServices.forEach((item) => {
      use(item.api, item.service);
    });
  },
  setI18n: (i18n: Record<string, unknown>) => {
    zodFlat.i18n = i18n;
  },
};

export type GewuHTTP = typeof gewuHTTP;
