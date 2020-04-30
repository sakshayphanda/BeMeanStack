import { Auth, authTypes } from '../actions/auth.actions';
import { IUserInfo } from 'src/app/shared/models/interfaces/authenticate.interface';

const defaultValues: IUserInfo = {
  loading: false,
  loggedIn: false
};
export const userAuthReducer = (state = defaultValues, action: Auth) => {
  switch (action.type) {
    case authTypes.DEFAULT_LOGIN: {
      const newState = {...state};
      newState.loading = true;
      return {...newState};
    }

    case authTypes.LOGGED_IN: {
      let newState = Object.assign({}, state);
      localStorage.setItem('token', action.payload.token);
      newState = Object.assign(newState, action.payload);
      newState.loading = false;
      newState.loggedIn = true;
      return {...newState};
    }

    case authTypes.LOG_OUT_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.loading = false;
      newState.loggedIn = false;
      localStorage.clear();
      return {...newState};
    }
  }
};

