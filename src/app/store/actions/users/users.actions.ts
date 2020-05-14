import { Action } from '@ngrx/store';
export const ListUsersSuccess = 'Users | List all users success';
export const ListUsersRequest = 'Users | List all users request';
export const FRIEND_REQUEST = 'Users | Friend Request';
export const FRIEND_REQUEST_SUCCESS = 'Users | Friend Request Success';


export class ListAllUsersRequest implements Action {
  readonly type = ListUsersRequest;
  constructor() {}
}
export class ListAllUsers implements Action {
  readonly type = ListUsersSuccess;
  constructor(public payload?: any) {}
}

export class FriendRequest implements Action {
  readonly type = FRIEND_REQUEST;
  constructor(public payload: {to: string, from: string}) {}
}

export class FriendRequestSuccess implements Action {
  readonly type = FRIEND_REQUEST_SUCCESS;
  constructor() {}
}


export type SuccessTypes = ListAllUsers | FriendRequestSuccess;
export type RequestTypes = ListAllUsersRequest | FriendRequest;
