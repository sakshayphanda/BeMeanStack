// Method 1..
// Method 2 .. working ---> npm run functions
/**
  const os = require('os');
  const fileSystem = require('fs');
  const path = require('path');
  const Logger = require('./functions/src/logger');
 */

const http = require("http");
const app = require("./src/app");
const port = process.env.PORT || 3000;

app.set("port", port);
const server = http.createServer(app);
server.listen(port);

/**Path
console.log(__dirname); // gives the directory of the file.
console.log(__filename); // gives the full path to the file name
console.log(path.basename(__filename)); // gives the file name
console.log(path.extname(__filename)); // returns the extension the file.
console.log(path.parse(__filename)); // this can be useful
console.log(path.join(__dirname, 'text', 'hi.html'));
*/

/**OS related methods
console.log(os.hostname());
console.log(os.platform());
console.log(os.arch());
console.log(os.cpus());
console.log(os.freemem());
console.log(os.totalmem());
*/

/**File System

fileSystem.mkdir(path.join(__dirname, '/new'), {}, error => {
  if(error) throw error;
});
fileSystem.writeFile(path.join(__dirname, '/new', 'hello.txt'), 'Helloo', error => {
  if(error) throw error;
});
fileSystem.appendFile(path.join(__dirname, '/new', 'hello.txt'), 'world', error => {
  if(error) throw error;
});

fileSystem.readFile(path.join(__dirname, '/new', 'hello.txt'), 'utf8', (error,data) => {
  if(error) throw error;
  console.log(data);
});
fileSystem.rename(path.join(__dirname, '/new', 'hello.txt'), path.join(__dirname, '/new', 'helloworld.txt'), (error,data) => {
  if(error) throw error;
  console.log(data);
});
 */

/**Event emitter
const logger = new Logger();

logger.on('log', (data) => {
  console.log(data);

});

logger.log('dafsvbd');

*/

/**
 * CreateReadStream
 * CreateWriteStream
 */
