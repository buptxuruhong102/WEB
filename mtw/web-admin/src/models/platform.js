import { queryList, deletePlatform, addPlatform,queryWebsiteList,queryPlatformList } from '../services/platform';

export default {
  namespace: 'platform',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    websiteList:[],
    platformList: [],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryList, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *getWebsiteList({ payload }, { call, put }) {
      const response = yield call(queryWebsiteList, payload);
      yield put({
        type: 'saveWebsiteList',
        payload: response.data.list,
      });
    },
    *getPlatformList({ payload }, { call, put }) {
      const response = yield call(queryPlatformList, payload);
      yield put({
        type: 'savePlatformList',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addPlatform, payload);
      if(response.success){
        yield put({
          type: 'fetch',
          payload: {},
        });
      }
      if (callback) callback(response);
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deletePlatform, payload);
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
    saveWebsiteList(state, action) {
      return{
        ...state,
        websiteList: action.payload
      };
    },
    savePlatformList(state, action) {
      return{
        ...state,
        platformList: action.payload
      };
    },
  },
};
