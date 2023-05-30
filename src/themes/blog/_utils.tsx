export function unique(arr: any[]) {
  return Array.from(new Set(arr));
}

export function classnames(...args: (string | Record<string, boolean> | undefined)[]) {
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

export const dateFormatter = {
  'yyyy-MM-dd': (date: Date | string) => {
    const d = new Date(date);
    const yyyy = d.getFullYear().toString();
    const MM = `0${d.getMonth() + 1}`.slice(-2);
    const dd = `0${d.getDate()}`.slice(-2);
    return `${yyyy}-${MM}-${dd}`;
  },
};

export function isRelativeLink(link: string) {
  if (link.startsWith('/')) {
    return false;
  }
  // https://en.wikipedia.org/wiki/List_of_URI_schemes
  if (/^[a-zA-Z0-9\-\.]+:\/\//.test(link)) {
    return false;
  }
  return true;
}
