const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const mysql = require("../../connector").con

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    let employee = req.body.employee
    let permissions = req.body.upstate
  
  let qry1 = "UPDATE `attendence`.`employees` SET `employee_full_name` = '"+employee.employee_full_name+"', `employee_mobile_number` = '"+employee.employee_mobile_number+"', `father_full_name` = '"+employee.father_full_name+"', `father_mobile_number` = '"+employee.father_mobile_number+"', `joining_date` = '"+employee.joining_date+"', `email` = '"+employee.email+"', `cnic` = '"+employee.cnic+"', `password` = '"+employee.password+"' WHERE (`employee_number` = '"+employee.employee_number+"');"
  let qry2 = "DELETE FROM attendence.permissions where employee_number = '"+employee.employee_number+"';" 
  
  mysql.query(qry1, (error, result) => {
      if (error){
        res.send({error:true})
      }else{
            mysql.query(qry2, (error, result) => {
              if (error){
                res.send({error:true})
              }else{
  
                for(var i=0; i<permissions.length; i++){
                      let qry3 = "INSERT INTO `attendence`.`permissions` (`employee_number`, `permission`) VALUES ('"+employee.employee_number+"', '"+permissions[i]+"');"
                      mysql.query(qry3, (error, result) => {
                        if (error){
                          res.send({error:true})
                        }});
                }
                res.send({error:false})
            }});
  
      }});
    }
  })
  module.exports = router