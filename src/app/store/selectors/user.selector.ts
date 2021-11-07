import { createFeatureSelector, createSelector } from "@ngrx/store";

export const users = createFeatureSelector("users");
export const getAllUsers = createSelector(users, (data) => {
  if (data) {
    return data[`users`];
  }
});

export const friendRequestSuccess = createSelector(users, (data) => {
  if (data) {
    return data[`updatedUser`];
  }
});
