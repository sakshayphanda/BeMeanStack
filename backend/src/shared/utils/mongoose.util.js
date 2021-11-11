const mongoose = require("mongoose"); // interacts with the mongo db

module.exports = {
  INIT_AND_CONNECT_TO_MONGOOSE: () => {
    // connection is created using mongoose (an external library added)
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useUnifiedTopology", true);

    mongoose
      .connect(
        "mongodb+srv://" +
          "sakshayphanda:SX49Enk2QlrZfXD7" +
          "@bemeanstack-b1ev1.mongodb.net/test?retryWrites=true&w=majority"
      )
      .then(() => {
        console.log("Connected to the database");
      })
      .catch((err) => {
        console.log(err, "Can not connect to the database");
      });
  },
};
