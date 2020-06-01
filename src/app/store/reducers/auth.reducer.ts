import * as DefaultAuth from '../actions/authentication/auth.actions';
import { IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

const defaultValues: IAuthInfo = {
  loading: false,
  loggedIn: false,
  user: {
    email: null,
    photoUrl: null,
    token: null,
    displayName: null,
    _id: null,
    friendRequests: [],
    friendRequestsPending: [],
    friends: []
  },
  message: null,
  isError: false
};
export function authenticationReducer(state = defaultValues, action: DefaultAuth.AuthTypes) {
  switch (action.type) {
    case DefaultAuth.LOGIN_REQUEST: {
      const newState = {...state};
      newState.loading = true;
      return newState;
    }

    case DefaultAuth.LOGIN_SUCCESS: {
      let newState = Object.assign({}, state);
      newState = Object.assign({}, newState, action.payload);
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
      return {...newState};
    }

    case DefaultAuth.UPDATE_USER: {
      const newState = Object.assign({}, state);

      newState.user = action.payload;
      console.log(newState, state);

      return {...newState};
    }

    default : {
      return state;
    }
  }
}


