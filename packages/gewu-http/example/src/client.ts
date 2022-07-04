import { get_hello, post_hello } from "./api";

const state = {
  name: "",
  age: 0,
  fish: 0,
};

const box = document.createElement("div");
box.style.display = "flex";
box.style.flexDirection = "flex-col";

const inputName = document.createElement("input");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
inputName.oninput = (e: { currentTarget: any }) => {
  state.name = e.currentTarget.value;
};
const inputAge = document.createElement("input");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
inputAge.oninput = (e: { currentTarget: any }) => {
  state.age = e.currentTarget.value;
};
const button = document.createElement("button");
button.textContent = "fetch";
button.onclick = () => {
  get_hello(state);
  get_hello(state).then((res) => {
    console.log("get", res.age);
  });
  post_hello(state).then((res) => {
    console.log("post", res.name);
  });
};

box.append(inputName, inputAge, button);
document.body.append(box);
