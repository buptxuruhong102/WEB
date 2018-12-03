import { stringify } from 'qs';
import request from '../utils/request';

export async function queryList(params) {
  return request(`/webSiteMan/platform/queryList.json?${stringify(params)}`);
}
export async function queryPlatformList(params) {
  return request(`/webSiteMan/dim/platform/queryList.json?${stringify(params)}`);
}
export async function queryWebsiteList(params) {
  return request(`/webSiteMan/info/queryList.json?${stringify(params)}`);
}
export async function deletePlatform(params) {
  return request(`/webSiteMan/platform/del.json?${stringify(params)}`);
}

export async function addPlatform(params) {
  return request('/webSiteMan/platform/save.json', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account.json', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
