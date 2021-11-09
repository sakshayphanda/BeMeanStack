import { Action } from '@ngrx/store';

export const LOGIN_REQUEST = '[LOGIN] Google';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = '[LOGIN_FAILED] Google';
export const LOGOUT_REQUEST = '[LOGOUT] Google';
export const LOGOUT_SUCCESS = '[LOGOUT_SUCCESS] Google';
export const LOGOUT_FAILED = '[LOGOUT_FAILED] Google';
export const SIGNUP_REQUEST = '[SIGNUP] Google';
export const SIGNUP_SUCCESS = '[SIGNUP_SUCCESS] Google';
export const SIGNUP_FAILED = '[SIGNUP_FAILED] Google';
export const CHECK_LOGGED_IN = '[CHECK_LOGGED_IN] Google';

export class LoginRequest implements Action {
  readonly type = LOGIN_REQUEST;
  constructor() {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
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
  constructor(public payload) {}
}

export type AuthTypes =
  | CheckLoggedIn
  | LoginRequest
  | LoginSuccess
  | LogoutRequest
  | LogoutSuccess;
