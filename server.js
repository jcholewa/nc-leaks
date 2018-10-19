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
  if (request.url === '/api/northcoders')
    if (request.method === 'GET') {
      getNorthcoders(response);
    };
});

function getNorthcoders(response) {
  fs.readFile('../northcoders.json', 'utf-8', (err, data) => {
    if (err) console.log(err);
    else {
      response.setHeader('Content-Type', 'application/json');
      response.statusCode = 200;
      response.write(data);
      response.end();
    };
  });
};

server.listen(9090);