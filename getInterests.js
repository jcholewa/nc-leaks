const https = require('https');
const fs = require('fs');

const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/people/:username/interests', 
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

    fs.writeFile('interests.js', body, (err) => {
      if (err) console.log(err, '<<<<err')
        // getFile('interests.js', (error, interests) => {
        //   let northcodersArr = [];
        //   people.people.forEach((interest) => {
        //     if (person.job.workplace === 'northcoders') {
        //       northcodersArr.push(JSON.stringify(person));
        //       fs.writeFile('northcoders.js', northcodersArr, (err) => {
        //         if(err) console.log(err);   
        //       })
        //     }
        //   })
        // })
    });
  })
})


req.on("error", (err) => {
    console.log(err)
  })
  
  req.end();
  
//   function getFile(filename, cb) {
  
//     fs.readFile(filename, 'utf8', (err, interests) => {
//       if (err) {
//         console.log(err);
//         return cb(err)
//       }
//       //console.log(typeof people)
//       const parsedInterests = JSON.parse(interests);
  
//       cb(null, parsedInterests)
//     })
//   };