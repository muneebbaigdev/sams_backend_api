const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const query = "DELETE FROM `attendence`.`sessiondates` WHERE (`idsessiondates` = '"+req.body.sid+"');"
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