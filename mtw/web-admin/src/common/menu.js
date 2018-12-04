import { isUrl } from '../utils/utils';

const menuData = [{
  name: '菜单组1',
  icon: 'table',
  path: 'website',
  children: [
        {
        name: 'userInfo',
        path: 'userInfo',
          authority: ['admin', 'user'],
    },
    {
        name: 'role',
        path: 'role',
        authority: ['admin'],//配置准入权限,可以配置多个角色
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
