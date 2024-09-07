const express = require('express');
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const mysql = require("../../connector").con

router.post('/', async (req, res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  const props = req.body;
  
  const query0 = await queryAsync("select * from attendence.students where admission_number ='"+props.admission_number+"';")
  const query1 = await queryAsync("select * from attendence.students where admission_number ='"+props.roll_no+"';")
  const query2 = await queryAsync("select * from attendence.students where admission_number ='"+props.cnic+"';")
  let qry = "INSERT INTO `attendence`.`students` (`admission_number`, `roll_no`, `student_full_name`, `student_mobile_number`, `father_full_name`, `father_mobile_number`, `joining_date`, `email`, `cnic`, `department`, `class`, `section`, `shift`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?);"
  let query = ("INSERT INTO `attendence`.`attendence` (`admission_number`) VALUES ('"+props.admission_number+"');");
  let query3 = ("INSERT INTO `attendence`.`fine` (`admission_number`) VALUES ('"+props.admission_number+"');");
  
  if(query0.length === 0 & query1.length === 0 & query2.length === 0){
   mysql.query(qry, [props.admission_number,props.roll_no,props.student_full_name,props.student_mobile_number,props.father_full_name,props.father_mobile_number,props.joining_date,props.email,props.cnic,props.department,props.class,props.section,props.shift],(err,results)=>{
    if (err){
        res.send(err)
    }
    else{
      mysql.query(query,(err,results)=>{
        if(err){
          res.send(err)
        }
        else{
  
      mysql.query(query3,(err,results)=>{
        if(err){
          res.send(err)
        }
        else{
          res.send({error:false})
        }
        
      })
  
  
    }
    
  })
      
    }
  });  
  
  
  }else{
  
    if(query0.length >= 1){
    res.send({error:true,msg:'Duplicate Admission Number'})
    } else if(query1.length >= 1){
    res.send({error:true,msg:'Duplicate Roll Number'})
    } else if(query2.length >= 1){
    res.send({error:true,msg:'Duplicate CNIC'})
    }
  }
    }
  });
  module.exports = router