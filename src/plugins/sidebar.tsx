import { PagicPlugin } from '../Pagic.ts';

interface SidebarConfigItem {
  title: string;
  link: string;
  children?: SidebarConfig;
}

type SidebarConfig = (SidebarConfigItem | string)[];

const sidebar: PagicPlugin = async (pagic) => {
  // Deep clone
  let sidebarConfig = JSON.parse(JSON.stringify(pagic.config.sidebar));
  sidebarConfig = parseSidebarConfig(sidebarConfig);
  for (const pagePath of pagic.pagePaths) {
    const pageProps = pagic.pagePropsMap[pagePath];
    pagic.pagePropsMap[pagePath] = {
      ...pageProps,
      sidebar: sidebarConfig
    };
  }

  function parseSidebarConfig(sidebarConfig: SidebarConfig) {
    return sidebarConfig.map((sidebarConfigItem) => {
      if (typeof sidebarConfigItem === 'string') {
        return {
          title: pagic.pagePropsMap[sidebarConfigItem].title,
          link: pagic.pagePropsMap[sidebarConfigItem].outputPath
        };
      }
      let item: SidebarConfigItem = sidebarConfigItem;
      if (typeof item.title === 'undefined') {
        item.title = pagic.pagePropsMap[item.link].title;
      }
      item.link = pagic.pagePropsMap[item.link].outputPath;
      if (Array.isArray(item.children)) {
        item.children = parseSidebarConfig(item.children);
      }
      return item;
    });
  }
};

sidebar.insert = 'before:layout';

export default sidebar;
