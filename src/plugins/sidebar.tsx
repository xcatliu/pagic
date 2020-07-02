import Pagic, { PagicPlugin } from '../Pagic.ts';
import { pick } from '../utils.ts';

export type PagicConfigSidebar = (
  | {
      text?: string;
      link?: string;
      children?: PagicConfigSidebar;
    }
  | string
)[];

export type PagePropsSidebar = {
  text: string;
  link?: string;
  children?: PagePropsSidebar;
  pagePath?: string;
}[];

const sidebar: PagicPlugin = async (pagic) => {
  if (!pagic.config.sidebar) {
    return;
  }
  const parsedSidebar = parseSidebarConfig(pagic.config.sidebar, pagic);

  for (const pagePath of pagic.pagePaths) {
    const pageProps = pagic.pagePropsMap[pagePath];
    pagic.pagePropsMap[pagePath] = {
      sidebar: parsedSidebar,
      ...getPreviousAndNext(parsedSidebar, pagePath),
      ...pageProps
    };
  }
};

function parseSidebarConfig(sidebarConfig: PagicConfigSidebar, pagic: Pagic): PagePropsSidebar {
  return sidebarConfig.map((sidebarConfigItem) => {
    if (typeof sidebarConfigItem === 'string') {
      return {
        text: pagic.pagePropsMap[sidebarConfigItem].title,
        link: pagic.pagePropsMap[sidebarConfigItem].outputPath,
        pagePath: pagic.pagePropsMap[sidebarConfigItem].pagePath
      };
    }
    // Deep clone
    let item = JSON.parse(JSON.stringify(sidebarConfigItem)) as PagePropsSidebar[0];
    if (typeof item.text === 'undefined' && typeof item.link !== 'undefined') {
      item.text = pagic.pagePropsMap[item.link].title;
    }
    if (typeof item.link !== 'undefined') {
      item.pagePath = item.link;
      item.link = pagic.pagePropsMap[item.link].outputPath;
    }
    if (Array.isArray(item.children)) {
      item.children = parseSidebarConfig(item.children, pagic);
    }
    return item;
  });
}

function getPreviousAndNext(pagePeopsSidebar: PagePropsSidebar, pagePath: string) {
  let last = null;
  let previous = null;
  let next = null;
  let found = false;
  // Deep clone
  let remain = JSON.parse(JSON.stringify(pagePeopsSidebar));
  while (remain.length > 0) {
    const current = remain.shift()!;
    if (found) {
      next = current;
      break;
    }
    if (current.children) {
      remain = [...current.children, ...remain];
    }
    if (current.pagePath === pagePath) {
      found = true;
      previous = last;
    } else {
      last = current;
    }
  }
  return {
    previous: pick(previous, ['text', 'link']),
    next: pick(next, ['text', 'link'])
  };
}

sidebar.insert = 'after:tsx';

export default sidebar;
