import { Action } from '@ngrx/store';


export const LOGIN_REQUEST = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const SIGNUP_REQUEST = 'SIGNUP';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const CHECK_LOGGED_IN = 'CHECK_LOGGED_IN';
export const UPDATE_USER = 'Update User';
export const UPDATE_USER_API = 'Update User API';


export class LoginRequest implements Action {
  readonly type = LOGIN_REQUEST;
  constructor(public payload) {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  constructor(public payload) {}
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  constructor(public payload) {}
}


export class LogoutRequest implements Action {
  readonly type = LOGOUT_REQUEST;
  constructor() {}
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  constructor() {}
}

export class CheckLoggedIn implements Action {
  readonly type = CHECK_LOGGED_IN;
  constructor() {}
}

export class UpdateUserApi implements Action {
  readonly type = UPDATE_USER_API;
  constructor(public payload) {}
}

export class UpdateUser implements Action {
  readonly type = UPDATE_USER;
  constructor(public payload) {}
}

export type AuthTypes = CheckLoggedIn | LoginRequest | LoginSuccess | LoginFailed | LogoutRequest |
LogoutSuccess | UpdateUser | UpdateUserApi;
