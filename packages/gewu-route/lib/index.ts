import { creator } from "./creator";
import { gewuRoute as _vouter } from "./gewuRoute";
import { Router, useHistoryChange } from "./Router";

export const gewuRoute = {
  ..._vouter,
  create: creator,
};
export { Router, useHistoryChange };
