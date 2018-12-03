import { stringify } from 'qs';
import request from '../utils/request';

export async function queryRule(params) {
  return request(`/api/rule.json?${stringify(params)}`);
}

export async function selectData(params) {
  return request(`/api/selectData.json?${stringify(params)}`);
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

export async function addRule(params) {
  return request('/api/addRule.json', {
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
