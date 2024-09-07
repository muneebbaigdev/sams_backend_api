const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const query = "DELETE FROM `attendence`.`offdates` WHERE (`idoffdates` = '"+req.body.date+"');"
    mysql.query(query,(err,result)=>{
      if(err){
        console.log(err)
        res.send({error:true})
      }else{
        res.send({error:false})
      }
    })
  }
  })
  module.exports = router