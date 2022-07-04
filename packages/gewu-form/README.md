# less-form

Build forms in React, only Controlled Components.

- Controlled Components
- Only update you need
- API like: [formik](https://formik.org/)
- Validate compatible [Soke](https://github.com/ymzuiku/soke) 、 [Yup](https://github.com/jquense/yup)

## Example

```tsx
import {
  ErrorMessage, // get error label
  LessForm, // Provider form
  Field,    // Consumer component
  FieldHOC, // Change a compoent to Consumer component HOC
  useField, // useContext, get a field data
  useForm,  // create Provider value
} from "gewu-form";
import { soke } from "soke";

const schema = soke.object({
  email: soke.string().email().required(),
  phone: soke.string().min(6).max(13).required(),
  password: soke.string().min(6).required(),
  friends: soke.array().min(3).required(),
  isMan: soke.bool().required(),
});

function App() {
  const form = useForm({
    initialValues: {
      email: "not email",
      phone: "",
      password: "",
      friends: [],
      isMan: false,
    },
    validateSchema: schema,
  });

  return (
    <div className="App">
      <div style={{ marginTop: 20 }}>Less form(use Field)</div>
      <div style={{ padding: 10, margin: 10, border: "1px solid #aaa" }}>
        <LessForm value={form}>
          <div>
            <Field name="email">
              {(ctx)=><input type="email" placeholder="please input email" {...ctx} />}
            </Field>
            <ErrorMessage name="email" />
          </div>
          <div>
            <Field name="phone">
              {(ctx)=><input type="phone" placeholder="please input phone" {...ctx} />}
            </Field>
            <ErrorMessage name="phone" />
          </div>
          <div>
            <Field name="password">
              {(ctx)=><input type="password" placeholder="please input password" {...ctx} />}
            </Field>
            <ErrorMessage name="password" />
          </div>
        </LessForm>
      </div>
      <div style={{ marginTop: 20 }}>Less form(use Custom Component)</div>
      <div style={{ padding: 10, margin: 10, border: "1px solid #aaa" }}>
        <LessForm value={form}>
          <Email />
          <Phone />
          <Password />
          <Friends />
          <Checkbox />
        </LessForm>
      </div>
    </div>
  );
}

function Email() {
  const field = useField("email");
  return (
    <div>
      <input placeholder="please input email" {...field} />
      <div>{field.error}</div>
    </div>
  );
}

function Phone() {
  const field = useField("phone");
  return (
    <div>
      <input placeholder="please input phone" {...field} />
      <div>{field.error}</div>
    </div>
  );
}

// base UI component
function BasePassword({onChange, value}) {
  return (
    <div>
      <input placeholder="please input password" type="password" onChange={onChange} value={value} />
      <div>{field.error}</div>
    </div>
  );
}

// HOC to component, add useField in component
function Password = FieldHOC(BasePassword);

function Friends() {
  const field = useField("friends");

  return (
    <div>
      <select multiple {...field}>
        <option onSelect={console.log} value="aaaaaa">
          aaa
        </option>
        <option value="apple">apple</option>
        <option value="banana">banana</option>
        <option value="dog">dog</option>
        <option value="cat">cat</option>
        <option value="fish">fish</option>
      </select>
      {JSON.stringify(field.value)}
      <div>{field.error}</div>
    </div>
  );
}

function Checkbox() {
  const field = useField("isMan");

  return (
    <div>
      <input type="checkbox" {...field}></input>
      <div>{field.error}</div>
    </div>
  );
}

export default App;
```

## Set in and get in

```tsx
import { ErrorMessage, Field, LessForm, useForm } from "gewu-form";
import { soke } from "soke";

// getin, setin error not support in yup
const schema = soke.object({
  "columns.0.name": soke.string().min(5, "need a email").required(),
});

export default function ExampleLessForm() {
  const form = useForm({
    initialValues: {
      columns: [{ name: "" }],
    },
    validateSchema: schema,
    handleChange: (values, name) => {
      return values;
    },
  });

  return (
    <div className="App">
      <div style={{ marginTop: 20 }}>Less form(use Field)</div>
      <div style={{ padding: 10, margin: 10, border: "1px solid #aaa" }}>
        <LessForm value={form}>
          <Field name="columns.0.name">
            {(ctx) => <input type="email" placeholder="please input email" {...ctx} />}
          </Field>
          <ErrorMessage name="columns.0.name" />
        </LessForm>
      </div>
    </div>
  );
}
```
