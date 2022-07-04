import fastify from "fastify";
import { gewuHTTP } from "../../lib";
import { createFastifyController } from "../../lib/createFastifyController";
import { get_hello, post_hello } from "./api";
const app = fastify();

gewuHTTP.useControllers(createFastifyController(app));

// 会根据 api_hello 的描述绑定路由、解析 query或body，校验入参，如果都通过了，执行第三个参数并且返回
get_hello.use(async (body) => {
  return { ...body, vip: "Supper" };
});

post_hello.use(async (body) => {
  return { ...body, vip: "the post" };
});

console.log("listen http//:127.0.0.1:3800");
app.listen({ port: 3800 });
