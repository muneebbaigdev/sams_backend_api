const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'
const mysql = require("./connector").con
router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    let userdata = req.body.userdata
    let permissions = req.body.permissionsarray
  
    mysql.query('select * from attendence.employees where employee_number = '+userdata.employee_number+';', (error, result) => {
      if (result.length === 0){
  
        queryAsync("INSERT INTO `attendence`.`employees` (`employee_number`, `employee_full_name`, `employee_mobile_number`, `father_full_name`, `father_mobile_number`, `joining_date`, `email`, `cnic`, `password`,`emp_token`) VALUES ('"+userdata.employee_number+"', '"+userdata.employee_full_name+"', '"+userdata.employee_mobile_number+"', '"+userdata.father_full_name+"', '"+userdata.father_mobile_number+"', '"+userdata.joining_date+"', '"+userdata.email+"', '"+userdata.cnic+"', '"+userdata.password+"','"+userdata.emp_token+"');")
        
        for(var i = 0; i<permissions.length; i++){
          queryAsync("INSERT INTO `attendence`.`permissions` (`employee_number`, `permission`) VALUES ('"+userdata.employee_number+"', '"+permissions[i]+"');")
        }
        res.send({error:false})
      }else{
        res.send({error:true})
  
      }
  
    });
    }
  
  })