import mockjs from 'mockjs';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
  'GET /api/(.*)': 'http://127.0.0.1/api/',
  'POST /api/(.*)': 'http://127.0.0.1/api/',
  'GET /webSiteMan/(.*)' : 'http://127.0.0.1/webSiteMan/',
  'POST /webSiteMan/(.*)' : 'http://127.0.0.1/webSiteMan/',
};

export default noProxy ? {} : delay(proxy, 1000);
