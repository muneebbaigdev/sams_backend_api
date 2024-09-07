const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/get-special-sections', async (req,res)=>{
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

  module.exports = router