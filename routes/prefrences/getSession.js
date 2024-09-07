const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/',async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const data = await queryAsync("select * from attendence.sessiondates;")
    res.send(data)
    }
  })
  module.exports = router