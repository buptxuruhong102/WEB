import { stringify } from 'qs';
import request from '../utils/request';

export async function queryPageType(params) {
  return request(`/webSiteMan/pageType/queryList.json?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule.json', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addPageType(params) {
  return request('/webSiteMan/pageType/save.json', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

/*export async function fakeAccountLogin(params) {
  return request('/api/login/account.json', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}*/

export async function getWebsiteInfo(params) {
  return request('/webSiteMan/pageType/queryWebSiteInfo.json',{
    method:'POST',
    body:params,
  });
}

export async function getPageType() {
  return request('/webSiteMan/dim/pagetype/queryList.json');
}

export async function deletePageType(params) {
  return request(`/webSiteMan/pageType/del.json?${stringify(params)}`);
}

export async function modifyPageType(params) {
  return request('/webSiteMan/pageType/modify.json', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}
