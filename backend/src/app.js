const express = require("express"); // framework for node.js
const app = express();
const path = require("path");
const bodyParser = require("body-parser"); // to parse the incoming object into Json
const MongooseUtil = require("./shared/utils/mongoose.util"); // interacts with the mongo db
const CommonUtil = require("./shared/utils/common.utils");
const authRoute = require("./controllers/authentication");
const usersRoute = require("./controllers/users");
const postsRoute = require("./controllers/posts");
const ROUTE_CONSTANTS = require("./shared/constants/routes.constants");
app.set("view engine", "ejs");

// Establish connection with MongoDB.
MongooseUtil.INIT_AND_CONNECT_TO_MONGOOSE();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("./images/")));
// app.use('/postUploads', express.static('postUploads')); // to make this folder publically available

// Set up Cross origin Resource Sharing
app.use(CommonUtil.setupCORS);

//Routes
app.use(ROUTE_CONSTANTS.PARENT_ROUTES.AUTH, authRoute);
app.use(ROUTE_CONSTANTS.PARENT_ROUTES.USERS, usersRoute);
app.use(ROUTE_CONSTANTS.PARENT_ROUTES.POSTS, postsRoute);

module.exports = app;
