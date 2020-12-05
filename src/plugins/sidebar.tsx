import type { PagicPlugin } from '../Pagic.ts';
// eslint-disable-next-line no-duplicate-imports
import type Pagic from '../Pagic.ts';

export type PagicConfigSidebar = Record<string, OnePagicConfigSidebar>;

export type OnePagicConfigSidebar = (
  | {
      text?: string;
      link?: string;
      children?: OnePagicConfigSidebar;
    }
  | string
)[];

export type PagePropsSidebar = {
  text: string;
  link?: string;
  pagePath?: string;
  children?: PagePropsSidebar;
}[];

const sidebar: PagicPlugin = {
  name: 'sidebar',
  insert: 'after:tsx',
  fn: async (pagic) => {
    if (!pagic.config.sidebar) {
      return;
    }

    for (const pagePath of pagic.pagePaths) {
      const pageProps = pagic.pagePropsMap[pagePath];

      let parsedSidebar: Record<string, PagePropsSidebar> = {};
      for (const [prefix, oneConfig] of Object.entries({ ...pagic.getConfig(pagePath).sidebar })) {
        parsedSidebar[prefix] = parseSidebarConfig(oneConfig, pagic);
      }

      for (const [prefix, pagePropsSidebar] of Object.entries(parsedSidebar)) {
        if (`/${pageProps.outputPath}`.startsWith(prefix)) {
          pagic.pagePropsMap[pagePath] = {
            ...pageProps,
            sidebar: pagePropsSidebar,
          };
          break;
        }
      }
    }
  },
};

function parseSidebarConfig(sidebarConfig: OnePagicConfigSidebar, pagic: Pagic): PagePropsSidebar {
  return sidebarConfig.map((sidebarConfigItem) => {
    if (typeof sidebarConfigItem === 'string') {
      return {
        text: pagic.pagePropsMap[sidebarConfigItem].title,
        link: pagic.pagePropsMap[sidebarConfigItem].outputPath,
        pagePath: pagic.pagePropsMap[sidebarConfigItem].pagePath,
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

export default sidebar;
