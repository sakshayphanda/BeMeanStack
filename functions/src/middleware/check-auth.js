const jwt = require("jsonwebtoken");
const TokenSchema = require('../model/blacklist-tokens');
const GLOBAL = require('../constants/global.constants');


const auth = async (request, response, next) => {
  try {
    goAhead = false;
    const token = request.headers.authorization;
    await TokenSchema.findOne({token: token}).then( tk => {

      if(tk) {
      response.status(401).json({ message: "Auth failed!" });
      } else {
        jwt.verify(token, GLOBAL.JWT_KEY);
        goAhead = true;
      }
      }
    );

    if(goAhead) {
      next();
    }

  } catch (error) {
    response.status(401).json({ message: "Auth failed!" });
  }
};

module.exports = auth;
