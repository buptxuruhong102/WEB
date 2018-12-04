import { stringify } from 'qs';
import request from '../utils/request';


export async function deleteInfo(params) {
  return request(`/api/role/remove?${stringify(params)}`);
}

export async function addInfo(params) {
  return request('/api/role/save', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function modifyInfo(params) {
  return request('/api/role/modify', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryList(params) {
  return request(`/api/role/findByPage?${stringify(params)}`);
}
