import * as fromUsersAction from '../actions/users/users.actions';

const defaultState = {
  users: [],
  updatedUser: {}
};
export const usersReducer = (state = defaultState, action: fromUsersAction.SuccessTypes) => {
  switch (action.type) {
    case fromUsersAction.ListUsersSuccess: {
      console.log(state);

      const newState = {...state};
      newState.users = action.payload;
      return {...newState};
    }

    case fromUsersAction.FRIEND_REQUEST_SUCCESS: {
      const newState = Object.assign({}, state);
      newState.updatedUser = action.payload;
      return {...newState};
    }

    default : {
      return state;
    }
  }
};
