// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("./db.json");
const middlewares = jsonServer.defaults();

const middleware = require("./middleware");

server.use(middleware);
server.use(middlewares);

server.use(router);
server.listen(3001);
