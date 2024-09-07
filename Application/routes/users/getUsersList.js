const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/', async (req, res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    let qry = ("SELECT * FROM attendence.employees;");
    mysql.query(qry, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      res.send(JSON.stringify(results));
    });
  }
  }); 
  module.exports = router