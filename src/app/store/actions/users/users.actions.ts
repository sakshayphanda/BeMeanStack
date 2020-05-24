import { Action } from '@ngrx/store';
export const ListUsersSuccess = 'Users | List all users success';
export const ListUsersRequest = 'Users | List all users request';
export const FRIEND_REQUEST = 'Users | Friend Request';
export const FRIEND_REQUEST_SUCCESS = 'Users | Friend Request Success';
export const FRIEND_REQUEST_ACCEPT = 'Users | Friend Request Accept';
export const FRIEND_REQUEST_REJECT = 'Users | Friend Request Reject';
export const UNFRIEND = 'Users | Unfriend';



export class ListAllUsersRequest implements Action {
  readonly type = ListUsersRequest;
  constructor() {}
}
export class ListAllUsers implements Action {
  readonly type = ListUsersSuccess;
  constructor(public payload) {}
}

export class FriendRequest implements Action {
  readonly type = FRIEND_REQUEST;
  constructor(public payload: {to: any, from: any}) {}
}

export class FriendRequestSuccess implements Action {
  readonly type = FRIEND_REQUEST_SUCCESS;
  constructor(public payload) {}
}

export class FriendRequestAcceptApi implements Action {
  readonly type = FRIEND_REQUEST_ACCEPT;
  constructor(public payload: {to: any, from: any}) {}
}

export class FriendRequestRejectApi implements Action {
  readonly type = FRIEND_REQUEST_REJECT;
  constructor(public payload: {to: any, from: any}) {}
}

export class UnfriendApi implements Action {
  readonly type = UNFRIEND;
  constructor(public payload: {to: any, from: any}) {}
}


export type SuccessTypes = ListAllUsers | FriendRequestSuccess;
export type RequestTypes = ListAllUsersRequest | FriendRequest | FriendRequestAcceptApi | FriendRequestRejectApi | UnfriendApi;
