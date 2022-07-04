import { isPhone } from "../device";
import { driverState } from "./driverState";

const errorLabel = Object.assign(document.createElement("div"), {
  className:
    "w-[80vw] mx-auto fixed bottom-10 left-[10vw] bg-pink-800 shadow-xl rounded text-white text-center p-2 hidden",
  onclick: () => {
    errorLabel.style.display = "none";
  },
});
errorLabel.style.zIndex = "8001";
document.body.append(errorLabel);

const testLabel = Object.assign(document.createElement("div"), {
  className:
    "fixed bottom-2 -right-7 bg-danger bg-opacity-50 py-0 px-8 shadow-sm opacity-50 pointer-events-none text-sm -rotate-45 origin-center select-none z-[8000]",
  textContent: driverState.testLabel,
});
requestAnimationFrame(() => {
  document.body.append(testLabel);
});

// 增加停止功能
window.addEventListener("keypress", (e) => {
  if (e.ctrlKey && e.key === "d") {
    driverState.stop = true;
  }
});

const mouse = Object.assign(document.createElement("div"), {
  className:
    "fixed top-1/2 -right-24 transition-all ease-out duration-300 bg-front-primary/[0.5] w-4 h-4 rounded-md border border-solid border-primary border-opacity-50 shadow-md pointer-events-none select-none z-[8000]",
});
document.body.append(mouse);

const showErrorMessage = async (err: string) => {
  console.warn("[test-kit]", err);
  errorLabel.textContent = err;
  errorLabel.classList.remove("pointer-events-none");
  Object.assign(errorLabel.style, {
    display: "block",
  });
  await wait(driverState.errorTipTime);
};

let rotate = 0;

const rotateMouse = () => {
  rotate += 1;
  if (rotate > 99) {
    rotate = 0;
  }
  mouse.style.transform = `rotate(${rotate * 180}deg)`;
};

let hiddenMouseTimeout: NodeJS.Timeout;

const hiddenMouse = () => {
  if (hiddenMouseTimeout) {
    clearTimeout(hiddenMouseTimeout);
  }
  mouse.style.display = "block";
  hiddenMouseTimeout = setTimeout(() => {
    mouse.style.display = "none";
  }, driverState.timeout * 3);
};

let endTime: NodeJS.Timeout | undefined;
const setEnd = () => {
  if (endTime) {
    clearTimeout(endTime);
    endTime = void 0;
  }
  // 超过2.5秒没有操作，就算停止
  endTime = setTimeout(() => {
    driverState.setSlow();
  }, 2000);
};

async function moveToEle(ele: HTMLInputElement) {
  if (driverState.stop) {
    await showErrorMessage("Stop!");
  }
  setEnd();
  const rect = ele.getBoundingClientRect();
  mouse.style.left = rect.x - 10 + rect.width / 2 + "px";
  mouse.style.top = rect.y - 10 + rect.height / 2 + "px";

  if (driverState.delay > 0) {
    await wait(driverState.delay);
  }
  if (driverState.lastFocus) {
    try {
      driverState.lastFocus.blur();
    } catch (e) {
      //
    }
  }
  try {
    ele.focus();
    driverState.lastFocus = ele;
  } catch (e) {
    //
  }

  mouse.style.transform = `scale(0.7)`;
  setTimeout(() => {
    mouse.style.transform = "scale(1)";
    hiddenMouse();
  }, driverState.delay / 1.5 + 20);
}

function waitGet<T>(fn: () => T, timeout = driverState.timeout): Promise<T | undefined> {
  return new Promise((res) => {
    const t = Date.now();
    const getFn = () => {
      rotateMouse();
      const ele = fn();
      if (ele) {
        res(ele);
        return;
      }
      if (Date.now() - t < timeout) {
        setTimeout(() => {
          getFn();
        }, 16);
        return;
      }
      res(void 0);
    };
    getFn();
  });
}

function wait(timeout = 100): Promise<undefined> {
  return new Promise((res) => setTimeout(() => res(void 0), timeout));
}

// 使用 XPath 查找文本相等
async function getEleByText(text: string): Promise<HTMLInputElement> {
  const ele = await waitGet(() => xPath(text));
  if (!ele) {
    const err = `can't not find "${text}"`;
    await showErrorMessage(err);
  }

  return ele as HTMLInputElement;
}

export function isInViewPortOfTwo(el: Element) {
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const top = el.getBoundingClientRect() && el.getBoundingClientRect().top;
  return top <= viewPortHeight + 50;
}

function xPath(text: string): HTMLElement {
  const headings = document.evaluate(`//div[contains(., '${text}')]`, document.body, null, XPathResult.ANY_TYPE, null);
  return headings.iterateNext() as HTMLElement;
}

// 判断元素是否 fixed
function isFixed(e: Element) {
  return (e as HTMLElement).style.position === "fixed" || (e as HTMLElement).classList.contains("fixed");
}

async function getEle(testID: string, tag = "*", attr = "test-id"): Promise<HTMLInputElement> {
  const eles = await waitGet(() => {
    const eles = document.body.querySelectorAll(`${tag}[${attr}="${testID}"]`)!;
    const list: HTMLInputElement[] = [];
    // 当找到多个元素时，排除 ele 不显示的
    eles.forEach((e) => {
      if ((e as HTMLElement).offsetParent || isFixed(e)) {
        list.push(e as HTMLInputElement);
      }
    });
    if (list.length > 0) {
      return list;
    }
    return void 0;
  });
  if (!eles) {
    const err = `can't not find "${testID}"`;
    await showErrorMessage(err);
  }

  // if (eles!.length > 1) {
  //   const err = `find many "${testID}"`;
  //   console.error(eles);
  //   await showErrorMessage(err);
  //   await wait(state.errorTipTime);
  // }
  const ele = eles![0];
  ele.scrollTo({ top: 100 });

  return ele;
}

async function click(testID: string | HTMLElement, attr = "test-id"): Promise<HTMLInputElement> {
  const ele = (typeof testID === "string" ? await getEle(testID, "*", attr) : testID) as HTMLInputElement;
  await moveToEle(ele);

  if (isPhone()) {
    const event = new TouchEvent("touchstart", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    ele.dispatchEvent(event);
  } else {
    const event = new MouseEvent("mousedown", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    ele.dispatchEvent(event);
  }

  ele.click();

  if (isPhone()) {
    const event = new TouchEvent("touchend", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    ele.dispatchEvent(event);
  } else {
    const event = new MouseEvent("mouseup", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    ele.dispatchEvent(event);
  }

  return ele;
}

async function clickText(text: string): Promise<HTMLInputElement> {
  const ele = await getEleByText(text);
  await click(ele);
  return ele;
}

async function clickWaitPage(testID: string | HTMLElement, attr = "test-id"): Promise<HTMLInputElement> {
  const nowHref = location.href;
  const ele = await click(testID, attr);
  await wait();
  await waitGet(() => location.href !== nowHref, 100);
  return ele;
}

async function input(
  testID: string | HTMLElement,
  value: string | boolean,
  attr = "test-id",
): Promise<HTMLInputElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ele = (typeof testID === "string" ? await getEle(testID, "input", attr) : testID) as any;
  await moveToEle(ele);

  // await click(ele);

  const inputEvent = new InputEvent("input", {
    data: value as string,
    view: window,
    bubbles: true,
    cancelable: false,
    // cancelable: true,
  });

  ele.value = value as string;
  ele.simulated = true;

  ele.dispatchEvent(inputEvent);

  if (driverState.noKeyboard) {
    ele.blur();
  }
  return ele;
}

async function change(
  testID: string | HTMLElement,
  value: string | boolean,
  attr = "test-id",
): Promise<HTMLInputElement> {
  const ele = (typeof testID === "string" ? await getEle(testID, "input", attr) : testID) as HTMLInputElement;
  await moveToEle(ele);
  ele.value = value as string;
  ele.dispatchEvent(
    new InputEvent("input", {
      data: value as string,
      view: window,
      bubbles: true,
      cancelable: true,
    }),
  );
  ele.dispatchEvent(
    new InputEvent("change", {
      data: value as string,
      view: window,
      bubbles: true,
      cancelable: true,
    }),
  );
  return ele;
}

async function waitRemove(testID: string | HTMLElement, tag = "*", attr = "test-id", timeout = 3000): Promise<void> {
  const removed = await waitGet(() => {
    const t =
      typeof testID == "string"
        ? document.body.querySelector(`${tag}[${attr}="${testID}"]`)
        : document.body.contains(testID);
    return !t;
  }, timeout);

  if (!removed) {
    const err = `can't not wait remove "${testID as string}"`;
    await showErrorMessage(err);
  }
}

async function clickWaitRemove(
  testID: string | HTMLElement,
  tag = "*",
  attr = "test-id",
  timeout = 3000,
): Promise<void> {
  await click(testID, attr);
  waitRemove(testID, tag, attr, timeout);
}

async function waitRemoveText(text: string, timeout = 3000): Promise<void> {
  const removed = await waitGet(() => {
    return !xPath(text);
  }, timeout);
  if (!removed) {
    const err = `can't not wait remove "${text}"`;
    await showErrorMessage(err);
  }
}

const assert = {
  eq: async <T>(a: T, b: T) => {
    if (a !== b) {
      const err = `a:${a} not equar b:${b}`;
      await showErrorMessage(err);
    }
  },
};

export const driver = {
  state: driverState,
  getEle,
  getEleByText,
  waitGet,
  waitRemove,
  waitRemoveText,
  wait,
  click,
  clickText,
  clickWaitRemove,
  input,
  change,
  assert,
  clickWaitPage,
};
