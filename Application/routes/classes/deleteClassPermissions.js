const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const mysql = require("../../connector").con


router.post('/',async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const qry = "DELETE FROM `attendence`.`classpermissions` WHERE (`idclasspermissions` = '"+req.body.data+"');"
    mysql.query(qry, (error, result) => {
      if (error){
        res.send({error:true})
      }else{
        res.send(result)
      }
    });
  }
  })
  module.exports = router