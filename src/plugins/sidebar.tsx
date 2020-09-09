import Pagic, { PagicPlugin } from '../Pagic.ts';

export interface PagicConfigSidebar {
  [prefix: string]: OnePagicConfigSidebar;
}

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
  children?: PagePropsSidebar;
  pagePath?: string;
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

      let parsedSidebar: {
        [prefix: string]: PagePropsSidebar;
      } = {};
      for (const [prefix, oneConfig] of Object.entries({
        ...pagic.config.sidebar,
        ...(pagic.config.i18n?.overrides?.[pageProps.language!]?.sidebar as PagicConfigSidebar)
      })) {
        parsedSidebar[prefix] = parseSidebarConfig(oneConfig, pagic);
      }

      for (const [prefix, pagePropsSidebar] of Object.entries(parsedSidebar)) {
        if (`/${pageProps.outputPath}`.startsWith(prefix)) {
          pagic.pagePropsMap[pagePath] = {
            sidebar: pagePropsSidebar,
            ...pageProps
          };
          break;
        }
      }
    }
  }
};

function parseSidebarConfig(sidebarConfig: OnePagicConfigSidebar, pagic: Pagic): PagePropsSidebar {
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

export default sidebar;
