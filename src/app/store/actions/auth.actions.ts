import { Action } from '@ngrx/store';

export enum authTypes {
  DEFAULT_LOGIN = 'DEFAULT_LOGIN',
  DEFAULT_SIGNUP = 'DEFAULT_SIGNUP',
  GOOGLE_LOGIN = 'GOOGLE_LOGIN',
  FACEBOOK_LOGIN = 'FACEBOOK_LOGIN',
  GOOGLE_SIGNUP = 'GOOGLE_SIGNUP',
  FACEBOOK_SIGNUP = 'FACEBOOK_SIGNUP',
  LOGGED_IN = 'LOGGED_IN',
  CHECK_LOGGED_IN = 'CHECK_LOGGED_IN',

  LOG_OUT_REQUEST = 'LOG_OUT_REQUEST',
  LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
  LOG_OUT_FAILED = 'LOG_OUT_FAILED'
}

export class DefaultLogin implements Action {
  readonly type = authTypes.DEFAULT_LOGIN;
  constructor(public payload) {}
}

export class LoggedIn implements Action {
  readonly type = authTypes.LOGGED_IN;
  constructor(public payload) {}
}

export class FacebookLogIn implements Action {
  readonly type = authTypes.FACEBOOK_LOGIN;
  constructor() {}
}

export class GoogleLogIn implements Action {
  readonly type = authTypes.GOOGLE_LOGIN;
  constructor() {}
}

export class CheckLoggedIn implements Action {
  readonly type = authTypes.CHECK_LOGGED_IN;
  constructor() {}
}
export class LogoutRequest implements Action {
  readonly type = authTypes.LOG_OUT_REQUEST;
  constructor() {}
}

export class LogoutSuccess implements Action {
  readonly type = authTypes.LOG_OUT_SUCCESS;
  constructor() {}
}

export type Auth = DefaultLogin | LoggedIn | FacebookLogIn | GoogleLogIn | CheckLoggedIn | LogoutRequest | LogoutSuccess;
