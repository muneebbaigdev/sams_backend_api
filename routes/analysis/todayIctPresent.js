const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const mysql = require("../../connector").con
const getCurrentDate = require('../../functions/getCurrentDate')

router.post('/', async (req,res)=>{

    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
      try {
        const query = "SELECT count(d"+getCurrentDate()+") as present,shift FROM attendence.attendence left join attendence.students on attendence.attendence.admission_number=attendence.students.admission_number where d"+getCurrentDate()+" = 'p' and shift = '"+req.body.shift+"';"
        mysql.query(query,(err,response)=>{
          if(err){
            console.log(err)
          }else{
            res.send(response[0])
          }
        })
        
        return
        } catch (error) {
          res.send('data not found')
      return
        }
      }
  })
  module.exports = router