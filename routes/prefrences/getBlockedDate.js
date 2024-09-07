const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/',async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const data = await queryAsync("select * from attendence.offdates;")
    const resdates = []
    for(var i = 0; i<data.length; i++){
      resdates.push(data[i].date)
    }
    res.send({resdates,data})
  }
  })
  module.exports = router