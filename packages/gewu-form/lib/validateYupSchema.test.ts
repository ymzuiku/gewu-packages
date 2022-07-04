import { expect, it } from "vitest";
import * as yup from "yup";
import { isYupSchema, validateYupSchema } from "./validateYupSchema";
it("validateYupSchema is yup", () => {
  const schema = yup.object({
    name: yup.string(),
    age: yup.number(),
  });
  expect(isYupSchema(schema)).eq(true);
});

it("validateYupSchema check", async () => {
  const mySchema = yup.object({
    username: yup.string().required(),
    dog: yup.number().required(),
    age: yup.number().optional(),
  });

  const data = {
    username: "name",
    dog: "20b",
    fish: "aa",
  };

  const res = await validateYupSchema(mySchema, data);
  expect(/dog must be a `number` type/.test(res.error)).eq(true);
});

it("validateYupSchema check one", async () => {
  const mySchema = yup.object({
    username: yup.string().required(),
    dog: yup.number().required(),
    age: yup.number().optional(),
  });

  const data = {
    username: "name",
    dog: "20b",
    fish: "aa",
    age: "aa",
  };

  const res = await validateYupSchema(mySchema, data, { key: "dog" });
  expect(/dog must be a `number` type/.test(res.error)).eq(true);
});
