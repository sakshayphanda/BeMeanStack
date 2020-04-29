import { Auth, authTypes } from '../actions/auth.actions';

const defaultValues = {
  loading: false
}
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
      return {...newState};
    }
  }
}
