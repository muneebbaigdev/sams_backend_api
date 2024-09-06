const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'
const mysql = require("./connector").con


router.post('/', async (req, res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const props = req.body.props;
    let value = req.body.value;
    let qry = "DELETE FROM `attendence`.`students` WHERE (`admission_number` = '"+value+"');";
  
   mysql.query(qry, [value],(err,results)=>{
    if (results)
            console.log("record deleted successfully");
            mysql.query("DELETE FROM `attendence`.`attendence` WHERE (`admission_number` = '"+value+"');");
            mysql.query("DELETE FROM `attendence`.`fine` WHERE (`admission_number` = '"+value+"');");
            res.json("ok");
            return
  
  });  
    }
  });