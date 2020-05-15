import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAuthInfo } from 'src/app/shared/models/interfaces/authenticate.interface';


export const authSelector = createFeatureSelector('authentication');
export const loadingState = createSelector(authSelector, (userAuth: IAuthInfo) => {
  return userAuth.loading;
});

export const users = createFeatureSelector('users');
export const getAllUsers = createSelector(users, (data) => {
  if(data) {
  return data[`users`];
  }
});

export const friendRequest = createSelector(users, (data) => {
  if (data) {
  return data[`updatedUser`];
  }
});
