import { queryList, deleteInfo, addInfo, modifyInfo } from '../services/userinfo';

export default {
  namespace: 'userInfo',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    areaGroups: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      let params = {pageNum:1, pageSize:10, ...payload}
      const response = yield call(queryList, params);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addInfo, payload);
      if(response.success){
        yield put({
          type: 'fetch',
          payload: {},
        });
      }
      if (callback) callback(response);
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyInfo, payload);
      if(response.success){
        yield put({
          type: 'fetch',
          payload: {},
        });
      }
      if (callback) callback(response);
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deleteInfo, payload);
      if(response.success){
        yield put({
          type: 'fetch',
          payload: {},
        });
      }
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },

  },
};
