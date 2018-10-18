const https = require('https');
const fs = require('fs')
const {exec} = require('child_process')

const options = {
  hostname: 'nc-leaks.herokuapp.com',
  path: '/api/people', 
  method: 'GET',
  header: {
  }
}

const req = https.request(options, (res) => {
    let body = "";

    res.on("data", data => {
        body += data.toString();
    })

  
    res.on("end", () => {

        fs.writeFile('people.js', body, (err) => {
          if (err) console.log(err, '<<<<err')
          getFile('people.js', (error, people) => {
            let northcodersArr = [];
           people.people.forEach((person) => {
              if (person.job.workplace === 'northcoders') {
                northcodersArr.push(JSON.stringify(person));
                fs.writeFile('northcoders.js', northcodersArr, (err) => {
                  if(err) console.log(err);
                  
                })
              }
              
            })
              
        //     cb(null, `File contents of ${filename}`);

          })
        });
      })
    })




req.on("error", (err) => {
  console.log(err)
})

req.end();

function getFile(filename, cb) {

  fs.readFile(filename, 'utf8', (err, people) => {
    if (err) {
      console.log(err);
      return cb(err)
    }
    //console.log(typeof people)
    const parsedPeople = JSON.parse(people);

    cb(null, parsedPeople)
  })
};