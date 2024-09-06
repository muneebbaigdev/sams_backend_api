const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'
const mysql = require("./connector").con


router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  const matcher = await queryAsync("Select * from attendence.employees where emp_token = '"+req.body.number+"';")
  
  const qry = "SELECT * FROM attendence.classpermissions where employee_number = '"+matcher[0].employee_number+"';"
    mysql.query(qry, (error, result) => {
      if (error){
        res.send({error:true})
      }else{
  
        res.send(result)
      }
    });
  }
  })