# gewu-route

A react router, mobile first.

features:

- Like navigation, page is keep in dom
- Auto split code pages
- Easy preload some pages when entry a page

## Example

```tsx
import { ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { gewuRoute } from "gewu-route";

const { Router, paths } = gewuRoute.create({
  "/": {
    render: () => import("./welcome"),
    // leave this page, auto remove in dom
    notKeep: true,
  },
  "/sign/login": {
    render: () => import("./sign/Login"),
  },
  "/product": {
    render: () => import("./Product"),
    // when enter product page, preload other page source code
    preload: ["/product/detail"],
  },
  "/product/detail": {
    render: () => import("./ProductDetail"),
  },
});

console.log(paths); // all paths map: {"/":"/", "/sign/login":"/sign/login", ...}

createRoot(document.getElementById("root")!).render(<Router />);
```

Use history:

```tsx
import { gewuRoute } from "gewu-route";

function App() {
  const handlePushProduct = () => {
    gewuRoute.push("/product", { id: "123" });
  };
  const handleReleaseProduct = () => {
    gewuRoute.release("/product", { id: "123" });
  };
  const handleClearToProduct = () => {
    gewuRoute.clearTo("/product", { id: "123" });
  };
  const handleGoBack = () => {
    gewuRoute.goBack();
  };
  return (
    <div>
      <div onClick={handlePushProduct}>push product</div>
      <div onClick={handleReleaseProduct}>release product</div>
      <div onClick={handleClearToProduct}>clear all stack and push product</div>
      <div onClick={handleGoBack}>go back</div>
    </div>
  );
}
```

### useHistoryChange

When sub page back, you can do something:

```tsx
function App() {
  const his = useHistoryChange();
  if (his.isBack) {
    console.log("I need fetch new data.");
  }
  return (
    <div>
      {his.isBack}
      {his.last}
      {his.stack}
    </div>
  );
}
```

### Events listen

If history stack is zero, and need back other url::

```tsx
import { gewuRoute } from "gewu-route";

gewuRoute.setOnLastBack((stack) => {
  if (stack.url.indexOf("/product") === 0) {
    return "/";
  }
  return stack.url;
});
```

When use history change:

```tsx
import { gewuRoute } from "gewu-route";

historyProxy.listen((event, stack) => {
  console.log(event, stack); // "popstate", [{...}, {...}]
});
```
