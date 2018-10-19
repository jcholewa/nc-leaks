const http = require('http');
const fs = require('fs');



const server = http.createServer((request, response) => {
  if (request.url === '/api') {
    if (request.method === 'GET') {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 200;
      response.write(JSON.stringify('Hello'));
      response.end();
    }
  }
});

server.listen(9090);