const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/',async (req,res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    let query = "Select sections from attendence.sections";
    const response = await queryAsync(query)
  res.send(response)
    }
  })
  module.exports = router