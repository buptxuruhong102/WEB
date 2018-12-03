import { stringify } from 'qs';
import request from '../utils/request';


export async function deleteInfo(params) {
  return request(`/api/${modelNameLowerCamel}/remove?${r"${stringify(params)}"}`);
}

export async function addInfo(params) {
  return request('/api/${modelNameLowerCamel}/save', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function modifyInfo(params) {
  return request('/api/${modelNameLowerCamel}/modify', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function queryList(params) {
  return request(`/api/${modelNameLowerCamel}/findByPage?${r"${stringify(params)}"}`);
}
