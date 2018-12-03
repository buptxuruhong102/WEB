import { isUrl } from '../utils/utils';

const menuData = [{
  name: '菜单组1',
  icon: 'table',
  path: 'website',
  children: [
    <#list allTableList as tableInfo>
    {
        name: '${tableInfo.modelNameLowerCamel}',
        path: '${tableInfo.modelNameLowerCamel}',
    },
</#list>
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
      result.children = formatter(item.children, `${r"${parentPath}${item.path}/"}`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
