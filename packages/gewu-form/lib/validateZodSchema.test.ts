import { expect, it } from "vitest";
import { z } from "zod";
import { isZodSchema, validateZodSchema } from "./validateZodSchema";
it("validateZodSchema is zod", () => {
  const schema = z.object({
    name: z.string(),
    age: z.number(),
  });
  expect(isZodSchema(schema)).eq(true);
});

it("validateZodSchema check", async () => {
  const mySchema = z.object({
    username: z.string(),
    dog: z.number({
      required_error: "必须有number",
      invalid_type_error: "必须是个number",
    }),
    age: z.number().optional(),
  });

  const data = {
    username: "name",
    dog: "20",
    fish: "aa",
  };

  const res = await validateZodSchema(mySchema, data);
  expect(res.error).eq("必须是个number");
});

it("validateZodSchema check one", async () => {
  const mySchema = z.object({
    username: z.string({
      required_error: "必须有string",
      invalid_type_error: "必须是个string",
    }),
    dog: z.number({
      required_error: "必须有number",
      invalid_type_error: "必须是个number",
    }),
    age: z.number().optional(),
  });

  const data = {
    username: "name",
    dog: "20",
    fish: "aa",
    age: "aa",
  };

  const res = await validateZodSchema(mySchema, data, { key: "dog" });
  expect(res.error).eq("必须是个number");
});
