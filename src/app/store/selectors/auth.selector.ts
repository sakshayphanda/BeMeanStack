import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserInfo, IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';


export const authSelector = createFeatureSelector('userAuth');
export const loadingState = createSelector(authSelector, (userAuth: IAuthInfo) => {
  return userAuth.loading;
});
