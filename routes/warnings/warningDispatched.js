const express = require('express');
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const mysql = require("./connector").con


router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
      const query = "INSERT INTO `attendence`.`warningletters` (`roll_no`, `warning_type`) VALUES ('"+req.body.roll_no+"', '"+req.body.warningtype+"');"
      mysql.query(query, (error, result) => {
        if (error){
          res.send({error:true})
        }else{
      
          res.send({error:false})
        }
      });
    }
  })
  module.exports = router