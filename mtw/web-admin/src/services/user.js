import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/webSiteMan/api/currentUser.json');
}

export async function queryMenu() {
  return request('/api/menu');
}
