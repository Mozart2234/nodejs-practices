const http = require('http');
const routes = require('./routes')

const server = http.createServer((res, req) => routes(res, req));

server.listen(3000)