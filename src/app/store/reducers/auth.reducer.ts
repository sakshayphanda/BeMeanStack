import { Auth, authTypes } from '../actions/auth.actions';

const defaultValues = {
  loading: false,
  token: null
}
export const userAuthReducer = (state = defaultValues, action: Auth) => {
  switch (action.type) {
    case authTypes.DEFAULT_LOGIN: {
      const newState = {...state};
      newState.loading = true;
      return {...newState};
    }

    case authTypes.LOGGED_IN: {
      const newState = {...state};
      console.log(action);
      localStorage.setItem('token', action.payload.token);
      newState.token = action.payload.token;
      newState.loading = false;
      return {...newState};
    }
  }
}
