const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
      try {
        const result = await queryAsync("SELECT count(admission_number) as strength FROM attendence.students where shift = '"+req.body.shift+"';");
        res.send(result[0])
        } catch (error) {
          console.log(error);
        }
      }
  })
  module.exports = router