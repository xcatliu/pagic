import type { PagicPlugin } from '../Pagic.ts';
import type { PagePropsSidebar } from './sidebar.tsx';
import { pick, depthFirstTraversal } from '../utils/mod.ts';

const prev_next: PagicPlugin = {
  name: 'prev_next',
  insert: 'after:sidebar',
  fn: async (pagic) => {
    for (const pagePath of pagic.pagePaths) {
      let pageProps = pagic.pagePropsMap[pagePath];
      if (typeof pageProps.prev === 'string') {
        pageProps.prev = {
          text: pagic.pagePropsMap[pageProps.prev].title,
          link: pagic.pagePropsMap[pageProps.prev].outputPath,
        };
      }
      if (typeof pageProps.next === 'string') {
        pageProps.next = {
          text: pagic.pagePropsMap[pageProps.next].title,
          link: pagic.pagePropsMap[pageProps.next].outputPath,
        };
      }
      if (!pageProps.sidebar) continue;
      pagic.pagePropsMap[pagePath] = {
        ...getPrevAndNext(pageProps.sidebar, pagePath),
        ...pageProps,
      };
    }
  },
};

function getPrevAndNext(
  pagePropsSidebar: PagePropsSidebar,
  pagePath: string,
): {
  prev?: { text: string; link: string };
  next?: { text: string; link: string };
} {
  let last: any;
  let prev: any;
  let next: any;
  let found = false;
  let shouldBreak = false;
  // Deep clone
  depthFirstTraversal(pagePropsSidebar, (current) => {
    if (shouldBreak) return;
    if (found) {
      if (typeof current.link !== 'undefined') {
        next = current;
        shouldBreak = true;
      }
      return;
    }
    if (current.pagePath === pagePath) {
      found = true;
      prev = last;
    } else {
      if (typeof current.link !== 'undefined') {
        last = current;
      }
    }
  });
  return {
    prev: pick(prev, ['text', 'link']),
    next: pick(next, ['text', 'link']),
  };
}

export default prev_next;
