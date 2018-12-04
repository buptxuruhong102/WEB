import { routerRedux } from 'dva/router';
import { fakeAccountLogin } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      if (response.status === 'ok') {
        reloadAuthorized();
        yield put(routerRedux.push('/'));
      }
    },
    *logout({ payload }, { put, select }) {
      try {
        console.log("payload",payload)
        console.log("window.location.href",window.location.href)
        // get location pathname
        //const urlParams = new URL(window.location.href);
        //console.log("urlParams",urlParams)
        //const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        //urlParams.searchParams.set('redirect', pathname);
        //window.history.replaceState(null, 'login', urlParams.href);


        //const sso = new URL("http://test.ssa.jd.com/sso/login");
        const sso = new URL(payload);
        sso.searchParams.set('ReturnUrl', window.location.href);
        window.location.href = sso.href;
        //console.log("sso.href",sso.href)
      } finally {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            currentAuthority: 'guest',
          },
        });
        reloadAuthorized();
        //yield put(routerRedux.push('https://ssa.jd.com/sso/login'));
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
