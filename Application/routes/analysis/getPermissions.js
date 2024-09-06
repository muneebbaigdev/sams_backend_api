const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'

router.post('/',async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    var data = []
    var responsearray = []
    try{
      const replace = await queryAsync("SELECT * FROM attendence.employees where emp_token = '"+req.body.usern+"';")
      data = await queryAsync('SELECT * FROM attendence.permissions where employee_number = '+replace[0].employee_number+';')
      for(var i =1; i<data.length; i++){
        responsearray.push(data[i].permission)
      }
    }catch(err){
      console.log(err)
    }
    res.send(responsearray)
  }
  })