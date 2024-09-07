const express = require('express')
const router = express.Router()
const getCurrentDate =require('../../functions/getCurrentDate')
const queryAsync = require('../../functions/queryAsync')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const class1 = req.body.class1
    const section = req.body.section1
    const query = "SELECT s.admission_number,s.roll_no,s.student_full_name,(d"+getCurrentDate()+") As status1 FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+class1+"' AND s.section = '"+section+"'"
    try {
      const result = await queryAsync(query);
      res.send(result)
      } catch (error) {
        console.log(error);
        return
      }
    }
  });

  module.exports = router