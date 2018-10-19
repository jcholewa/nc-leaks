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
  if (request.url === '/api/northcoders') {
    if (request.method === 'GET') {
      getNorthcoders(response);
    };
  }; 
  // if (request.url === `/api/northcoders/users`) {
  //   getUsername(response);
  // }; 
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

function writeUser(request, response) {
  let rawNewUser = '';
  request.on('data', d => rawNewUser += d.toString());
  request.on('end', () => {
    console.log(body);
  });
    fs.readFile('../northcoders.json', 'utf-8', (err, data) => {
      const northcoderPeople = data.filter(person => {
        console.log(person.username);
        return person.username = rawNewUser;
      });
    });
};

// function getUsername(response) {
//   fs.readFile('usernames.json', 'utf-8', (err, data) => {
//     if (err) console.log(err);
//     else {
//       const userArr = JSON.parse(data);
//       userArr.forEach((user => {

//       }))
//     }
//   });
// };

server.listen(9090);