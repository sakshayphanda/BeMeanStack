import {
  createFeatureSelector,
  createSelector,
  DefaultProjectorFn,
  MemoizedSelector,
} from '@ngrx/store';
import {
  IAuthInfo,
  IUserInfo,
} from 'src/app/shared/models/interfaces/authenticate.interface';

export const authSelector: MemoizedSelector<any, any> =
  createFeatureSelector('authentication');

export const currentUser: MemoizedSelector<
  any,
  IUserInfo,
  DefaultProjectorFn<IUserInfo>
> = createSelector(authSelector, (auth: IAuthInfo) => {
  return auth.user;
});

export const loadingState = createSelector(
  authSelector,
  (userAuth: IAuthInfo) => {
    return userAuth.loading;
  }
);
