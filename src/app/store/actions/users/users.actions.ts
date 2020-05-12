import { Action } from '@ngrx/store';
export const ListUsersSuccess = 'Users | List all users success';
export const ListUsersRequest = 'Users | List all users request';


export class ListAllUsersRequest implements Action {
  readonly type = ListUsersRequest;
  constructor() {}
}
export class ListAllUsers implements Action {
  readonly type = ListUsersSuccess;
  constructor(public payload?: any) {}
}


export type types = ListAllUsers | ListAllUsersRequest;
