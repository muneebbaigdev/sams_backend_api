const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'

router.post('/',async (req,res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const query = "DELETE FROM `attendence`.`departments` WHERE (`department` = '"+req.body.deletedepartment+"');"
    const result = await queryAsync(query)
    res.send(result)
    }
  })