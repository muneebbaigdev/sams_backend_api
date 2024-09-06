const express = require('express');
const router = express.Router();
import queryAsync from '../../functions/queryAsync';
import getCurrentDate from '../../functions/getCurrentDate';
import countOccurrenceszx from '../../functions/countOccurrenceszx';


router.post('/', async (req, res) => {
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    const getpermissions = await axios.post('http://'+ip+':8000/get-permissions', {token:req.body.token,usern:req.body.token}, {
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
      },
    });
    let date = req.body.date;
    const checkdate = getCurrentDate()
  
    if(date === checkdate){
      if(authorize.length===1){
  
        let admission_number = req.body.admission_number
        let status = req.body.status
        let qry1 = "UPDATE `attendence`.`attendence` SET `d"+date+"` = '"+status+"' WHERE (`admission_number` = '"+admission_number+"');"
        let qry2 = "ALTER TABLE `attendence`.`attendence` ADD COLUMN `d"+date+"` VARCHAR(45) NULL DEFAULT 'p';"
        
        try {
          await queryAsync(qry1, 'Error marking attendance');
          res.send({err:false,msg:'Attendance marked successfully'});
          return;
        } catch (error1) {
          console.error(error1);
          try {
            await queryAsync(qry2, 'Error adding new column');
            await queryAsync(qry1, 'Error marking attendance');
            res.send({err:false,msg:'Attendance marked successfully after adding a new column'});
          } catch (error2) {
            console.error(error2);
          }
        }
        }
    }else if(countOccurrenceszx(getpermissions.data,'MarkAttendancebydate')===1){
      if(authorize.length===1){    
      
        let admission_number = req.body.admission_number
        let status = req.body.status
        let qry1 = "UPDATE `attendence`.`attendence` SET `d"+date+"` = '"+status+"' WHERE (`admission_number` = '"+admission_number+"');"
        let qry2 = "ALTER TABLE `attendence`.`attendence` ADD COLUMN `d"+date+"` VARCHAR(45) NULL DEFAULT 'p';"
        
        try {
          await queryAsync(qry1, 'Error marking attendance');
          res.send({err:false,msg:'Attendance marked successfully'});
          return;
        } catch (error1) {
          console.error(error1);
          try {
            await queryAsync(qry2, 'Error adding new column');
            await queryAsync(qry1, 'Error marking attendance');
            res.send({err:false,msg:'Attendance marked successfully after adding a new column'});
          } catch (error2) {
            console.error(error2);
          }
        }
        }
    }else{
      res.send({err:true,msg:'Please Set Your System Date First!'})
    }
  
  
  
  
  
  
  
  });