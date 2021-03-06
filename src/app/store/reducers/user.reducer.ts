import * as fromUsersAction from '../actions/users/users.actions';

const defaultState = {
  users: [],
  updatedUser: {}
};
export function usersReducer(state = defaultState, action: fromUsersAction.SuccessTypes) {
  switch (action.type) {
    case fromUsersAction.ListUsersSuccess: {
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
}

