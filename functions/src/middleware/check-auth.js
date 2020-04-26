const jwt = require("jsonwebtoken");

const auth = (request, response, next) => {
  try {
    const token = request.headers.authorization;
    jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    response.status(401).json({ message: "Auth failed!" });
  }
};

module.exports = auth;
