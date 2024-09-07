const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const convertDateFormat = require('../../functions/convertDateFormat')



router.post('/', async (req, res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
      let present = [[],[],[],[],[],[]];
      let date1 = convertDateFormat(req.body.date1);
      date1 = 'd'+date1
      const classSections = [
        { class: '1st-year', section: 'a' },
        { class: '1st-year', section: 'b' },
        { class: '2nd-year', section: 'a' },
        { class: '2nd-year', section: 'b' },
        { class: '3rd-year', section: 'a' },
        { class: '3rd-year', section: 'b' }
      ];
  for(var b = 0; b<classSections.length; b++){
        try {
    const result = await queryAsync("select admission_number,class,section,count(admission_number) as strength from students where class = '"+classSections[b].class+"' and section='"+classSections[b].section+"';");
    present[b].push(result[0].strength)
    } catch (error) {
      console.log(error);
    }
  }
  for(var b = 0; b<classSections.length; b++){
      try {
  const result = await queryAsync("SELECT s.admission_number,"+date1+",COUNT(a."+date1+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+classSections[b].class+"' AND s.section = '"+classSections[b].section+"' AND a."+date1+" = 'p';");
  present[b].push(result[0].count_of_present)
  } catch (error) {
    console.log(error);
  }
  }
  for(var b = 0; b<classSections.length; b++){
    try {
  const result = await queryAsync("SELECT s.admission_number,"+date1+",COUNT(a."+date1+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+classSections[b].class+"' AND s.section = '"+classSections[b].section+"' AND a."+date1+" = 'a';");
  present[b].push(result[0].count_of_present)
  } catch (error) {
  console.log(error);
  }
  }
  for(var b = 0; b<classSections.length; b++){
    try {
  const result = await queryAsync("SELECT s.admission_number,"+date1+",COUNT(a."+date1+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+classSections[b].class+"' AND s.section = '"+classSections[b].section+"' AND a."+date1+" = 'l';");
  present[b].push(result[0].count_of_present)
  } catch (error) {
  console.log(error);
  }
  }
  res.send(present)
    }
  });
  module.exports = router