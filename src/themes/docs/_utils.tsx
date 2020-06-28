export function unique(arr: any[]) {
  return Array.from(new Set(arr));
}

export function classnames(
  ...args: (
    | string
    | {
        [key: string]: boolean;
      }
  )[]
) {
  let classList: string[] = [];
  for (const arg of args) {
    if (typeof arg === 'string') {
      classList.push(arg);
    } else {
      classList = [...classList, ...Object.keys(arg).filter((key) => arg[key])];
    }
  }
  return unique(classList).join(' ');
}
