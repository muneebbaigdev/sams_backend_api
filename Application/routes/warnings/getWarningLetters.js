const express = require('express');
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const convertDateFormatzx = require('../../functions/convertDateFormatzx')
const convertDate = require('../../functions/convertDate')
const getDatesInRange = require('../../functions/getDatesInRange')
const countOccurrences = require('../../functions/countOccurrences')


router.post('/',async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const {classn,section,session} = req.body
    const dates = await queryAsync("select * from attendence.sessiondates where session = '"+session+"';")
    const dates1 = dates[0]
    var sdate = convertDateFormatzx(dates1.startdate)
    var ldate = convertDateFormatzx(dates1.enddate)
    sdate = convertDate(sdate)
    ldate = convertDate(ldate)
    const students = await queryAsync("select * from attendence.students where class = '"+classn+"' and section = '"+section+"';")
    var warningletters = []
    const darray = getDatesInRange(sdate,ldate)
    const data = await queryAsync("select * from attendence.attendence;")
    const data1 = data[0]
    
    const warnings = await queryAsync("SELECT * FROM attendence.warningletters;")
  
    for(var iii=0; iii<students.length; iii++){
  
      const stuadn = students[iii].admission_number;
      var rightarray1 = []
      var rightarray = 'admission_number,'
      for(var i=0; i<darray.length; i++){
        tester = darray[i]
        if(data.length !== 0){
        if(data1['d'+tester] === undefined){
          
        }
        else{
          rightarray+=('d'+tester+',')
          rightarray1.push('d'+tester)
        }
      }
      }
      rightarray = rightarray.slice(0,-1)
      const updateddata =await queryAsync("select "+rightarray+" from attendence.attendence where admission_number = '"+stuadn+"';")
      var attendancearray = []
      for(var i=0; i<rightarray1.length; i++){
        let hel = updateddata[0]
        let pel = rightarray1[i]
        attendancearray.push(hel[pel])
      }
      const total = countOccurrences(attendancearray, 'a');
      var checked = 'Pending'
  
      if(total>9){
  
        for(var t=0; t<warnings.length; t++){
          if(warnings[t].roll_no === students[iii].roll_no & warnings[t].warning_type === 'First'){
            checked = 'dispatched'
          }
        }
        var datapush = {name:students[iii].student_full_name,admission_number:students[iii].admission_number,roll_no:students[iii].roll_no,absent_count:total,warningtype:'First',warning_status:checked}
        
        warningletters.push(datapush)
        checked = 'Pending'
      }
      if(total>19){
        for(var t=0; t<warnings.length; t++){
          if(warnings[t].roll_no === students[iii].roll_no & warnings[t].warning_type === 'Second'){
            checked = 'dispatched'
          }
        }
        var datapush = {name:students[iii].student_full_name,admission_number:students[iii].admission_number,roll_no:students[iii].roll_no,absent_count:total,warningtype:'Second',warning_status:checked}
  
        warningletters.push(datapush)
        checked = 'Pending'
      }
      if(total>29){
        for(var t=0; t<warnings.length; t++){
          if(warnings[t].roll_no === students[iii].roll_no & warnings[t].warning_type === 'Third'){
            checked = 'dispatched'
          }
        }
        var datapush = {name:students[iii].student_full_name,admission_number:students[iii].admission_number,roll_no:students[iii].roll_no,absent_count:total,warningtype:'Third',warning_status:checked}
  
        warningletters.push(datapush)
        checked = 'Pending'
      }
  
    }
  
    res.send(warningletters)
  }
  })
  module.exports = router