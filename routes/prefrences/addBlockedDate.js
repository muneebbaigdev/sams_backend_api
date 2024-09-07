const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  const check = await queryAsync("select * from attendence.offdates where date = '"+req.body.date+"';")
  const query = "INSERT INTO `attendence`.`offdates` (`date`, `comment`) VALUES ('"+req.body.date+"', '"+req.body.comment+"');"
  if(check.length===0){
  await queryAsync(query)
  res.send({error:false})
  }else{
    res.send({error:true})
  }
    }
  })
  module.exports = router