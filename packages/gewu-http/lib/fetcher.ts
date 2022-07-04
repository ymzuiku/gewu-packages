import { ZodSchema } from "zod";
import { zodFlat } from "zod-flat";
import { gewuHTTP } from ".";
import { API } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fetchResponse(v: any) {
  const code = v.status;
  if (code >= 200 && code <= 299) {
    return v.json();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return v.json().then((err: any) => {
    if (typeof err === "object") {
      if (err.message) {
        throw new Error(err.message);
      }
      throw err;
    }
    throw new Error(err);
  });
}

// 前端请求服务端的绑定方法
export const fetcher = async <T extends ZodSchema, O extends ZodSchema>(
  body: T,
  api: API<T, O>,
  fetchInit?: RequestInit,
): Promise<O> => {
  const opt = {
    method: api.method,
    ...fetchInit,
  };
  if (api.method === "GET") {
    const query = new URLSearchParams(body as never).toString();
    return fetch(fetcher.baseURL + api.url + "?" + query, opt).then(fetchResponse);
  }

  try {
    const res = await fetch(fetcher.baseURL + api.url, {
      ...opt,
      body: JSON.stringify(body),
    }).then(fetchResponse);
    return zodFlat.parse(api.responseSchema, res);
  } catch (err) {
    gewuHTTP.onResponseError && gewuHTTP.onResponseError(err);
    throw err;
  }
};

fetcher.baseURL = "";
