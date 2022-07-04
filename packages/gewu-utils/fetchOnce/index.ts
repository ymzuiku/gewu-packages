import { MemoPromiseFn } from "./MemoPromiseFn";
export * from "./MemoPromiseFn";

const oneDay = 1000 * 60 * 60 * 24;

export async function fetchOnce(url: string, init?: RequestInit): Promise<string> {
  return MemoPromiseFn(
    { fn: (...args) => fetch(args[0], args[1]).then((v) => v.text()), cacheTime: oneDay, key: url },
    init,
  );
}
