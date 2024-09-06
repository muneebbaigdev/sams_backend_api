const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'
const mysql = require("./connector").con

router.post('/', async (req, res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    let value = req.body.value.admission_number;
    let qry = "SELECT * FROM attendence.students where (admission_number = '"+value+"');";
  
   mysql.query(qry, [value],(err,results)=>{
    if (err)
        console.log("eror fetching data");
    else
        res.send(results);
  });  
    }
  });