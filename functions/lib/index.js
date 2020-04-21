"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
const http = require('http');
const app = require('./app');
// const os = require('os');
// const fileSystem = require('fs');
// const path = require('path');
// const Logger = require('./logger');
const port = process.env.PORT || 3000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);
exports.application = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map