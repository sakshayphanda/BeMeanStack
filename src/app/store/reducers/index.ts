import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze'; // prevents the data from getting mutated
import { authenticationReducer } from './auth.reducer';
import { usersReducer } from './user.reducer';
import { postsReducer } from './post.reducer';

export interface AppState {
  router;
  authentication;
  users;
  posts;
}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  authentication: authenticationReducer,
  users: usersReducer,
  posts: postsReducer
};

export const metaReducers: MetaReducer<{}>[] = !environment.production ? [storeFreeze] : [];
