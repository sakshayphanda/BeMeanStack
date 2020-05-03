import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { environment } from 'src/environments/environment';
import { storeFreeze } from 'ngrx-store-freeze'; // prevents the data from getting mutated
import { userAuthReducer } from './auth.reducer';


export const reducers: ActionReducerMap<{}> = {
  router: routerReducer,
  userAuth: userAuthReducer
};

export const metaReducers: MetaReducer<{}>[] = !environment.production ? [storeFreeze] : [];
