const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const getCurrentDate = require('../../functions/getCurrentDate')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const responseArray = [];
    const class1 = req.body.classn
    const section = req.body.section
    for(var m=0; m<1; m++){
      var strength=0;
      var present=0;
      var absent=0;
      var leave=0;
      var lates=0;
      
        try {
          const result = await queryAsync("select admission_number,class,section,count(admission_number) as strength from students where class = '"+class1+"' and section='"+section+"';");
          strength=result[0].strength
          } catch (error) {
            console.log(error);
          }
      
  
          try {
            const result = await queryAsync("SELECT s.admission_number,d"+getCurrentDate()+",COUNT(a.d"+getCurrentDate()+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+class1+"' AND s.section = '"+section+"' AND a.d"+getCurrentDate()+" = 'p';");
            present=result[0].count_of_present
            } catch (error) {
              console.log(error);
            }
            try {
              const result = await queryAsync("SELECT s.admission_number,d"+getCurrentDate()+",COUNT(a.d"+getCurrentDate()+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+class1+"' AND s.section = '"+section+"' AND a.d"+getCurrentDate()+" = 'a';");
              absent=result[0].count_of_present
              } catch (error) {
                console.log(error);
              }
              try {
                const result = await queryAsync("SELECT s.admission_number,d"+getCurrentDate()+",COUNT(a.d"+getCurrentDate()+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+class1+"' AND s.section = '"+section+"' AND a.d"+getCurrentDate()+" = 'l';");
                leave=result[0].count_of_present
                } catch (error) {
                  console.log(error);
                }
                try {
                  const result = await queryAsync("SELECT s.admission_number,d"+getCurrentDate()+",COUNT(a.d"+getCurrentDate()+") AS count_of_present FROM students s JOIN attendence a ON s.admission_number = a.admission_number where s.class = '"+class1+"' AND s.section = '"+section+"' AND a.d"+getCurrentDate()+" = 'lt';");
                  lates=result[0].count_of_present
                  } catch (error) {
                    console.log(error);
                  }
      responseArray.push(strength,present,absent,leave,lates)
        }
      
      res.send(responseArray)
    }
  });

module.exports = router