const express = require('express');
const router = express.Router()
const ip = require('../../ipaddress')

router.post('/', async (req, res) => {

    try {
      var dbi = [];
      let students = req.body.students;
      let sdate = req.body.sdate;
      let ldate = req.body.ldate;
      const apiUrl = 'http://'+ip+':8000/fines';
  
      for (var i = 0; i < students.length; i++) {
        let postData = {
          admission_number: students[i].admission_number,
          sdate: sdate,
          ldate: ldate,
        };
  
        try {
          const response = await axios.post(apiUrl, postData, {
            headers: {
              'Content-Type': 'application/json',
              // Add any additional headers if needed
            },
          });
  
          // Handle the successful response
          dbi.push(response.data);
          if (i+1 === students.length){
          res.send(dbi);
          }
        } catch (error) {
          // Handle errors
          console.error('Error:', error.message);
        }
      }
    } catch (err) {
      console.log(err);
    }
  
  });
  module.exports = router