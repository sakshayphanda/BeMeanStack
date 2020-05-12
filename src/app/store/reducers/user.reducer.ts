import * as fromUsersAction from '../actions/users/users.actions';

const defaultState = {
  users: []
}
export const usersReducer = (state = defaultState, action: fromUsersAction.types) => {
  switch (action.type) {
    case fromUsersAction.ListUsersSuccess: {
      const newState = {...state};
      newState.users = action.payload;
      return {...newState};
    }
  }
};
