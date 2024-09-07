const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/',async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const data = req.body.selectedValue
    const resu = await queryAsync("select * from attendence.classpermissions where employee_number = '"+data.employee_number+"' and class='"+data.classn+"' and section = '"+data.section+"';")
    const qry = "INSERT INTO `attendence`.`classpermissions` (`employee_number`, `class`, `section`) VALUES ('"+data.employee_number+"', '"+data.classn+"', '"+data.section+"');"
    if(resu.length===0){
    await queryAsync(qry)
      res.send({error:false})
  }else{
    res.send({error:true})
  }
    }
  })
  module.exports = router