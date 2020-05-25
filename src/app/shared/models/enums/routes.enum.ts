export enum AuthRoutes {
  SIGN_UP = '/auth/signup',
  LOG_IN = '/auth/login',
  LOG_OUT = '/auth/logout',
  CHECK_AUTH = '/auth/check-auth'
}


export enum UserRoutes {
  GET_ALL_USERS = '/users/get-all-users',
  FRIEND_REQUEST = '/users/friend-request',
  FRIEND_REQUEST_ACCEPTED = '/users/friend-request-accepted',
  FRIEND_REQUEST_REJECTED = '/users/friend-request-rejected',
  UNFRIEND = '/users/unfriend'
}

export enum PostRoutes {
  CREATE = '/posts/create-post',
  GET_POSTS = '/posts/get-all-posts'
}
