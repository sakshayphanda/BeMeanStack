export interface IAuthenticate {
  email: string;
  password: string;
}


export interface IAuthInfo {
  loading: boolean;
  loggedIn: boolean;
  user: IUserInfo;
  message: string;
  isError: boolean;
}

export interface IUserInfo {
  token: string;
  displayName: string;
  email: string;
  photoURL: string;
}
