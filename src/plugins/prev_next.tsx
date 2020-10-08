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
          title: pagic.pagePropsMap[pageProps.prev].title,
          link: pagic.pagePropsMap[pageProps.prev].outputPath
        };
      }
      if (typeof pageProps.next === 'string') {
        pageProps.next = {
          title: pagic.pagePropsMap[pageProps.next].title,
          link: pagic.pagePropsMap[pageProps.next].outputPath
        };
      }
      if (!pageProps.sidebar) continue;
      pagic.pagePropsMap[pagePath] = {
        ...getPrevAndNext(pageProps.sidebar, pagePath),
        ...pageProps
      };
    }
  }
};

function getPrevAndNext(pagePropsSidebar: PagePropsSidebar, pagePath: string) {
  let last: any = null;
  let prev: any = null;
  let next: any = null;
  let found = false;
  let shouldBreak = false;
  // Deep clone
  depthFirstTraversal(pagePropsSidebar, (current) => {
    if (shouldBreak) return;
    if (found) {
      next = current;
      shouldBreak = true;
      return;
    }
    if (current.pagePath === pagePath) {
      found = true;
      prev = last;
    } else {
      last = current;
    }
  });
  return {
    prev: pick(prev, ['title', 'link']),
    next: pick(next, ['title', 'link'])
  };
}

export default prev_next;
