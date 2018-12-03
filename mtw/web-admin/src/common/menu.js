import { isUrl } from '../utils/utils';

const menuData = [{
  name: '垂直站点管理',
  icon: 'table',
  path: 'website',
  children: [  {
    name: '站点管理',
    path: 'info',
  }, {
    name: '平台管理',
    path: 'platform',
  }, {
    name: '页面类型管理',
    path: 'page-type',
  }],
}];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map((item) => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
