const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/',async (req,res)=>{

    let data =await queryAsync("SELECT employee_number,emp_token,employee_full_name FROM attendence.employees where emp_token='"+req.body.userName+"';")
    if(data.length === 0){
    res.send({username:'f33af23235456fgg433ggwg43662436;;K;$#$$3gGgg43$%#$%geGrt$#%5gfd$%v65654',emp_token:'36;;K;$#$$3gGgg43$gwg43662436;;K;$#$$3gGgg43$%%#$%geGrt$#%5gfd$%v65654'})
    }else{
    res.send(data[0])
    }
  })
  module.exports = router