module.exports = Object.freeze({
  SESSION_TIMEOUT: "10h",
  KEYS_TO_POPULATE_IN_USER_DATA: "friends friendRequests friendRequestsPending",
  REMOVE_NOT_REQUIRED_KEYS_FROM_USER_DATA:
    "-password -friendRequests -friendRequestsPending",
});
