import * as fromPostsAction from '../actions/posts/posts.actions';

const defaultState = [{
  text: 'First Post',
  user: null
}];
export function postsReducer(state = defaultState, action: fromPostsAction.SuccessTypes) {
  switch (action.type) {

    case fromPostsAction.CREATE_POSTS_SUCCESS: {
      let newState = Object.assign([], state);
      if (action.payload instanceof Array) {
      newState = [...action.payload];
      } else {
        newState = [action.payload, ...newState];
      }

      return [...newState];
    }

    default : {
      return state;
    }
  }
}

