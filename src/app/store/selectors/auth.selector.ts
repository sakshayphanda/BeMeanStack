import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';


export const authSelector = createFeatureSelector('authentication');
export const currentUser = createSelector(authSelector, (auth: IAuthInfo) => {
  return auth.user;
});
export const loadingState = createSelector(authSelector, (userAuth: IAuthInfo) => {
  return userAuth.loading;
});

