import * as DefaultAuth from '../actions/auth.actions';
import { IUserInfo, IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

const defaultValues: IAuthInfo = {
  loading: false,
  loggedIn: false,
  user: {
    email: null,
    photoURL: null,
    token: null,
    displayName: null
  },
  message: null,
  isError: false
};
export function userAuthReducer(state = defaultValues, action: DefaultAuth.AuthTypes) {
  switch (action.type) {
    case DefaultAuth.LOGIN_REQUEST: {
      const newState = {...state};
      newState.loading = true;
      return newState;
    }

    case DefaultAuth.LOGIN_SUCCESS: {
      let newState = Object.assign({}, state);
      newState = Object.assign(newState, action.payload);
      newState.loading = false;
      newState.loggedIn = true;
      newState.isError = false;
      return newState;
    }

    case DefaultAuth.LOGIN_FAILED: {
      const newState = Object.assign({}, state);
      newState.loading = false;
      newState.loggedIn = false;
      newState.message = action.payload;
      newState.isError = true;
      return newState;
    }

    case DefaultAuth.LOGOUT_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.loading = false;
      newState.loggedIn = false;
      localStorage.clear();
      return {...newState};
    }
  }
};

