const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const getCurrentDate = require('../../functions/getCurrentDate')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  
    const responseArray = [];
    const classSections = req.body.classsections
  
  
  for(var m=0; m<classSections.length; m++){
  var strength=0;
  var present=0;
  var absent=0;
  var leave=0;
  var lates=0;
  
  const result = await queryAsync("select admission_number,class,section,count(admission_number) as strength from students where class = '"+classSections[m].class+"' and section='"+classSections[m].section+"';");
  strength=result[0].strength
  
  const result1 = await queryAsync("SELECT s.admission_number,d"+getCurrentDate()+",COUNT(a.d"+getCurrentDate()+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+classSections[m].class+"' AND s.section = '"+classSections[m].section+"' AND a.d"+getCurrentDate()+" = 'p';");
  present=result1[0].count_of_present
  
  const result2 = await queryAsync("SELECT s.admission_number,d"+getCurrentDate()+",COUNT(a.d"+getCurrentDate()+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+classSections[m].class+"' AND s.section = '"+classSections[m].section+"' AND a.d"+getCurrentDate()+" = 'a';");
  absent=result2[0].count_of_present
  
  const result3 = await queryAsync("SELECT s.admission_number,d"+getCurrentDate()+",COUNT(a.d"+getCurrentDate()+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+classSections[m].class+"' AND s.section = '"+classSections[m].section+"' AND a.d"+getCurrentDate()+" = 'l';");
  leave=result3[0].count_of_present
  
  const result4 = await queryAsync("SELECT s.admission_number,d"+getCurrentDate()+",COUNT(a.d"+getCurrentDate()+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+classSections[m].class+"' AND s.section = '"+classSections[m].section+"' AND a.d"+getCurrentDate()+" = 'lt';");
  lates=result4[0].count_of_present
  
  responseArray.push([strength,present,absent,leave,lates])
  
  }
  
  res.send(responseArray)
    }
  
  })

  module.exports = router