module.exports = {
  setupCORS: (request, response, next) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept,Authorization"
    );
    response.setHeader(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    next();
  },
};
