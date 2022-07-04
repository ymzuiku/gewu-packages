import { ZodSchema } from "zod";
import { API } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createFastifyController = (app: any) => {
  return <T extends ZodSchema, O extends ZodSchema>(api: API<T, O>, service: (body: T) => Promise<O>) => {
    if (api.method === "GET") {
      app.get(api.url, (req: { query: T }) => {
        return api(req.query, service);
      });
    } else {
      app[api.method.toLocaleLowerCase()](api.url, (req: { body: T }) => {
        return api(JSON.parse(req.body as never), service);
      });
    }
    return service;
  };
};
