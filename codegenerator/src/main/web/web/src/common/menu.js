import { isUrl } from '../utils/utils';

const menuData = [{
  name: '菜单组1',
  icon: 'table',
  path: 'website',
  children: [
        {
        name: 'userInfo',
        path: 'userInfo',
    },
    {
        name: 'role',
        path: 'role',
    },
  ],
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
