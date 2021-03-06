const jwt = require("jsonwebtoken");
const TokenSchema = require('../model/blacklist-tokens');
const Messages = require('../constants/messages.constant');


const auth = async (request, response, next) => {
  try {
    goAhead = false;
    const token = request.headers.authorization;
    await TokenSchema.findOne({ token: token }).then(tk => {

      if (tk) {
        response.status(401).json({ message: Messages.AUTH_FAILED });
      } else {
        jwt.verify(token, process.env.JWT_KEY);
        goAhead = true;
      }
    }
    );

    if (goAhead) {
      next();
    }

  } catch (error) {
    response.status(401).json({ message: Messages.AUTH_FAILED });
  }
};

module.exports = auth;
