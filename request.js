const https = require('https');
const fs = require('fs');

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
      getFile('people.js', (error, { people }) => {
        const northcoderPeople = people.filter(person => {
          return person.job.workplace === "northcoders";
        })
        fs.writeFile('northcoders.json', JSON.stringify(northcoderPeople,null,2), (err) => {
          if (err) console.log(err);
          fs.readFile('northcoders.json', 'utf-8', (err, coders) => {
            if (err) console.log(err);
            const parsedCoders = JSON.parse(coders);
            const userNames = parsedCoders.map(coder => {
              return coder.username; 
            });    
            fs.writeFile('usernames.json', JSON.stringify(userNames, null, 2), (err) => {
              if (err) console.log(err);
            });
          });
        });
          //forEach on the array
            //get Interests
              //Option 1
                //save each interest into array
                //once all information is back
                //save an interests.json file
              //Option 2
                //foreach response we save down an individual file for each username

                //fs.readFile(`${username}.json` () =)
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

fs.readFile('northcoders.js', 'utf8', (err, usernames) => {
  if (err) console.log(err, '<<<<err')

});

function getFile(filename, cb) {
  fs.readFile(filename, 'utf8', (err, people) => {
    if (err) {
      console.log(err);
      return cb(err)
    }
    const parsedPeople = JSON.parse(people);
    cb(null, parsedPeople)
  })
};