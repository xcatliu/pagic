import { PagicPlugin } from '../Pagic.ts';

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
}[];

const sidebar: PagicPlugin = async (pagic) => {
  for (const pagePath of pagic.pagePaths) {
    const pageProps = pagic.pagePropsMap[pagePath];
    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      // Deep clone
      sidebar: parseSidebarConfig(JSON.parse(JSON.stringify(pagic.config.sidebar)))
    };
  }

  function parseSidebarConfig(sidebarConfig: PagicConfigSidebar): PagePropsSidebar {
    return sidebarConfig.map((sidebarConfigItem) => {
      if (typeof sidebarConfigItem === 'string') {
        return {
          text: pagic.pagePropsMap[sidebarConfigItem].title,
          link: pagic.pagePropsMap[sidebarConfigItem].outputPath
        };
      }
      let item = sidebarConfigItem as PagePropsSidebar[0];
      if (typeof item.text === 'undefined' && typeof item.link !== 'undefined') {
        item.text = pagic.pagePropsMap[item.link].title;
      }
      if (typeof item.link !== 'undefined') {
        item.link = pagic.pagePropsMap[item.link].outputPath;
      }
      if (Array.isArray(item.children)) {
        item.children = parseSidebarConfig(item.children);
      }
      return item;
    });
  }
};

sidebar.insert = 'after:tsx';

export default sidebar;
