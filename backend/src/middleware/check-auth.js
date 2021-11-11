const jwt = require("jsonwebtoken");
const TokenSchema = require("../model/blacklist-tokens");
const Messages = require("../shared/constants/messages.constant");
const GLOBAL = require("../shared/constants/global.constants");

const auth = async (request, response, next) => {
  try {
    goAhead = false;
    const token = request.headers.authorization;
    await TokenSchema.findOne({ token }).then((tk) => {
      if (tk) {
        response.status(401).json({ message: Messages.ERROR.AUTH_FAILED });
      } else {
        jwt.verify(token, GLOBAL.SECRET_KEY);
        goAhead = true;
      }
    });

    if (goAhead) {
      next();
    }
  } catch (error) {
    response.status(401).json({ message: Messages.ERROR.AUTH_FAILED });
  }
};

module.exports = auth;
