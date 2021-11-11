module.exports = Object.freeze({
  PARENT_ROUTES: {
    AUTH: "/auth",
    USERS: "/users",
    POSTS: "/posts",
  },
  AUTH: {
    CHECK_AUTH: "/check-auth",
    LOG_IN: "/login",
    LOG_OUT: "/logout",
    SIGN_UP: "/signup",
    UPDATE_PASSWORD: "/updatePassword",
    UPDATE_USER: "/update-user",
    GET_USER: "/get-user",
  },
  USER: {
    FRIEND_REQUEST: "/friend-request",
    FRIEND_REQUEST_ACCEPTED: "/friend-request-accepted",
    FRIEND_REQUEST_REJECTED: "/friend-request-rejected",
    UNFRIEND: "/unfriend",
    GET_ALL_USERS: "/get-all-users",
  },
  POST: {
    READ_ALL_POST: "/get-all-posts",
    CREATE_POST: "/create-post",
    UPDATE_POST: "/update-post",
    DELETE_POST: "/delete-post",
  },
});
