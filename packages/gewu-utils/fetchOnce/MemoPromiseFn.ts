/* eslint-disable @typescript-eslint/no-explicit-any */

export const memoCache: Record<string, Record<string, { time: number; done: number; data: any }>> = {};
export const clearAllMemoCache = () => {
  Object.keys(memoCache).forEach((key) => {
    delete memoCache[key];
  });
};

export interface MemoPromiseFnOptions {
  fn: (...args: any[]) => Promise<any>;
  cacheTime: number;
  key: string;
}

export async function MemoPromiseFn({ fn, cacheTime, key }: MemoPromiseFnOptions, ...args: any[]): Promise<any> {
  const input = JSON.stringify(args);
  if (!memoCache[key]) {
    memoCache[key] = {};
  }
  if (memoCache[key][input] && Date.now() - memoCache[key][input].time < cacheTime) {
    if (memoCache[key][input].done == 1) {
      return memoCache[key][input].data;
    }
    return new Promise((res) => {
      const t = Date.now();
      const timer = setInterval(() => {
        if (Date.now() - t > 1000 * 15) {
          clearInterval(timer);
          res(void 0);
        } else if (memoCache[key][input] && memoCache[key][input].done === 1) {
          clearInterval(timer);
          res(memoCache[key][input].data);
        }
      }, 50);
    });
  }

  memoCache[key][input] = {
    done: 0,
    time: Date.now(),
    data: {},
  };

  try {
    const res = await fn(key, ...args);
    if (res) {
      if (res.error) {
        delete memoCache[key][input];
      } else {
        memoCache[key][input].data = res;
        memoCache[key][input].done = 1;
      }
    }
    return res;
  } catch (err) {
    delete memoCache[key][input];
    return err;
  }
}
