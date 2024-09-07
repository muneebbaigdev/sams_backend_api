const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/',async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const qry = "SELECT s.employee_number,employee_full_name,a.class,a.section,a.idclasspermissions FROM employees s JOIN classpermissions a ON s.employee_number = a.employee_number;"
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