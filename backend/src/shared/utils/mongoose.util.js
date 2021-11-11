const mongoose = require("mongoose"); // interacts with the mongo db
const MESSAGES = require("../constants/messages.constant");
const password = "sakshayphanda:SX49Enk2QlrZfXD7";
const DB_PATH = `mongodb+srv://${password}@bemeanstack-b1ev1.mongodb.net/test?retryWrites=true&w=majority`;
module.exports = {
  INIT_AND_CONNECT_TO_MONGOOSE: () => {
    // connection is created using mongoose (an external library added)
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useUnifiedTopology", true);
    mongoose
      .connect(DB_PATH)
      .then(() => {
        console.log(MESSAGES.SUCCESS.CONNECTED_DB);
      })
      .catch((err) => {
        console.log(err, MESSAGES.ERROR.CANT_CONNECT_DB);
      });
  },
};
