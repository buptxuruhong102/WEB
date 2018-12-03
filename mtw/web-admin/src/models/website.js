import { queryList, deleteInfo, addInfo, modifyInfo, queryGroups } from '../services/website';

export default {
  namespace: 'website',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    areaGroups: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *getGroupList({ payload }, { call, put }) {
      const response = yield call(queryGroups, payload);
      yield put({
        type: 'queryGroups',
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
    queryGroups(state, action) {
      return{
        ...state,
        areaGroups: action.payload
      };
    },
  },
};
