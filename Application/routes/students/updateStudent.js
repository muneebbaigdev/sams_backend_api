const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'
const mysql = require("./connector").con

router.post('/',async (req, res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  let value = req.body;
  
  let qry = "UPDATE `attendence`.`students` SET `roll_no` = '"+value.roll_no+"', `student_full_name` = '"+value.student_full_name+"', `student_mobile_number` = '"+value.student_mobile_number+"', `father_full_name` = '"+value.father_full_name+"', `father_mobile_number` = '"+value.father_mobile_number+"', `joining_date` = '"+value.joining_date+"', `email` = '"+value.email+"', `cnic` = '"+value.cnic+"', `department` = '"+value.department+"', `class` = '"+value.class1+"', `section` = '"+value.section+"', `shift` = '"+value.shift+"' WHERE (`admission_number` = '"+value.admission_number+"');"
   mysql.query(qry, [value],(err,results)=>{
    if (err)
        console.log("eror modifying student");
    else
        res.send("all ok");
  });  
    }
  });