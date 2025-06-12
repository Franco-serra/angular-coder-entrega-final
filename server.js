const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const customAuth = require('./middleware.js');

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(customAuth);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
}); 