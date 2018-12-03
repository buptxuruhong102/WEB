import { queryPageType, removeRule, addPageType, getWebsiteInfo ,getPageType,deletePageType,modifyPageType} from '../services/pagetype';

export default {
  namespace: 'pagetype',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    website:[],
    dimPageType:[],
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryPageType, payload);
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *loadWebsite({payload},{call,put}){
      const  response = yield call(getWebsiteInfo,payload);
      yield put({
        type: 'assemblyWebsite',
        payload:response
      });

    },
    *loadPageType({payload},{call,put}){
      const response = yield call(getPageType,payload);
      yield put ({
        type:'assemblyPageType',
        payload:response
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addPageType, payload);
      if(response.success){
        yield put({
          type: 'fetch',
          payload: {},
        });
      }
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *delete({ payload, callback }, { call, put }) {
      const response = yield call(deletePageType, payload);
      if(response.success){
        yield put({
          type: 'fetch',
          payload: {},
        });
      }
      if (callback) callback(response);
    },
    *modify({ payload, callback }, { call, put }) {
      const response = yield call(modifyPageType, payload);
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
    assemblyWebsite(state,action){
      return {
        ...state,
        website: action.payload.list,
      };
    },
    assemblyPageType(state, action) {
      return {
        ...state,
        dimPageType: action.payload.data,
      }
    }
  },
};
