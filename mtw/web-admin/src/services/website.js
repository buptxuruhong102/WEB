import { stringify } from 'qs';
import request from '../utils/request';

export async function queryGroups(params) {
  return request(`/webSiteMan/dim/area/queryGroups.json?${stringify(params)}`);
}

export async function deleteInfo(params) {
  return request(`/webSiteMan/info/del.json?${stringify(params)}`);
}

export async function addInfo(params) {
  return request('/webSiteMan/info/save.json', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function modifyInfo(params) {
  return request('/webSiteMan/info/modify.json', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryList(params) {
  return request(`/webSiteMan/info/queryList.json?${stringify(params)}`);
}
