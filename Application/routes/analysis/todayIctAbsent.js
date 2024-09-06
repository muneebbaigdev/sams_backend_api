const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'
import getCurrentDate from '../../functions/getCurrentDate'

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    try {
      const result = await queryAsync("SELECT count(d"+getCurrentDate()+") as absent,shift FROM attendence.attendence left join attendence.students on attendence.attendence.admission_number=attendence.students.admission_number where d"+getCurrentDate()+" = 'a' and shift = '"+req.body.shift+"';")
      res.send(result[0])
      return
      } catch (error) {
        res.send('data not found')
        return
  
      }
    }
  })