export default function (fn: () => void, duration: number) {
  let lastTime: number | undefined;
  // eslint-disable-next-line
  return function (this: any, ...args: any[]) {
    const now = new Date().getTime();
    if (!lastTime) {
      fn.apply<any, any[], any>(this, args);
      lastTime = now;
      return;
    }
    if (now - lastTime < duration) {
      return;
    }
    fn.apply<any, any[], any>(this, args);
    lastTime = now;
  };
}
