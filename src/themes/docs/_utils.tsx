export function unique(arr: any[]) {
  return Array.from(new Set(arr));
}

export function classnames(
  ...args: (
    | string
    | {
        [key: string]: boolean;
      }
    | undefined
  )[]
) {
  let classList: string[] = [];
  for (const arg of args) {
    if (typeof arg === 'string') {
      classList.push(arg);
    } else if (typeof arg !== 'undefined') {
      classList = [...classList, ...Object.keys(arg).filter((key) => arg[key])];
    }
  }
  return unique(classList).join(' ');
}

export function isInViewport(elem: any) {
  const bounding = elem.getBoundingClientRect();
  return (
    bounding.top >= 0 &&
    bounding.left >= 0 &&
    // @ts-ignore
    bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    // @ts-ignore
    bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
