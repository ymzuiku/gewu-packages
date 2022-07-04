# gewu-http

> 一个前后端约定接口的工具方法, 此库仅仅是请求和接口声明的简单封装

- 前后端使用相同校验
- 通过同一个对象描述请求和相应的声明
- 校验方法不可知
- 请求方法不可知
- 后端不可知
- 提供了默认的 yup 校验、fetch 绑定、fastify 绑定

## Install

```sh
$ npm install gewu-http
```

Use in Javascript / Typescript

```js
import { gewu-http } from "gewu-http";
```

## Use

### 定义接口描述和校验

```ts
import { gewuHTTP } from "gewu-http";
import { yup } from "yup";

interface Hello {
  name: string;
  age: number;
}

interface HelloResp {
  name: string;
  age: number;
  vip: string;
}

// 描述了请求体类型、响应类型、url、校验
export const api_hello = gewuHTTP.api<Hello, HelloResp>({
  url: "/v1/hello",
  method: "POST",
  requestSchema: yup.object({
    name: yup.string().required("需要提供name"),
    age: yup.number().required("需要提供age").min(3),
  }),
  responseSchema: yup.object({
    name: yup.string().required("需要返回name"),
    age: yup.number().required("需要返回age"),
    vip: yup.string().required("需要返回vip"),
  }),
});
```

### 后端声明接口

```tsx
import fastify from "fastify";
import { gewuHTTP } from "gewu-http";
import { api_hello } from "dto/hello";

const app = fastify();

// 会根据 api_hello 的描述绑定路由、解析 query或body，校验入参，如果都通过了，执行第三个参数并且返回
gewuHTTP.use(app, api_hello, async (body) => {
  return { ...body, vip: "Supper" };
});

gewuHTTP.listen({ port: 5000 });
```

### 前端发起请求

```tsx
import { gewuHTTP } from "gewu-http";
import { api_hello } from "dto/hello";

const app = fastify();

// 会根据 api_hello 的描述绑定路由、解析 query或body，校验入参，如果都通过了，执行第三个参数并且返回
gewuHTTP.use(app, api_hello, async (body) => {
  return { ...body, vip: "Supper" };
});

gewuHTTP.listen({ port: 5000 });
```
