const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const mysql = require("../../connector").con

router.post('/', async (req, res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    let user = req.body.username
    let qry = ("DELETE FROM `attendence`.`permissions` WHERE (`employee_number` = '"+user+"');")
    let qry2 = ("DELETE FROM `attendence`.`employees` WHERE (`employee_number` = '"+user+"');")
    mysql.query(qry2, (error, results) => {
      if (error) {
        console.log(error);
        return;
      }
      mysql.query(qry, (error, results) => {
        if (error) {
          console.log(error);
          return;
        }
        res.send(JSON.stringify(results));
      });
    });
  }
  });
  module.exports = router