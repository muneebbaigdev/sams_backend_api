const express = require('express');
const router = express.Router()
import queryAsync from "../../functions/queryAsync";
import countConsecutiveAs from "../../functions/countConsecutiveAs";
import convertDateToDayForm from "../../functions/covertDateToDayForm";
router.post('/', async (req, res) => {

    try {
      
      const { sdate, ldate, admission_number } = req.body;
  
      const data = await queryAsync(`SELECT * FROM attendence.attendence WHERE admission_number = ${admission_number}`);
      const datess = [];
      const dayss = [];
      const attendance = [];
  
      for (let x = sdate; x <= ldate; x++) {
        const dayName = convertDateToDayForm(x.toString());
  
        if (dayName !== 'Saturday' && dayName !== 'Sunday') {
          datess.push(x);
          dayss.push(dayName);
  
          const dxdx = 'd' + x.toString();
          attendance.push(data[0][dxdx] || null);
        }
      }
  
      let regurala = 0;
      let speciala = 0;
      let fine = 0;
      let absentcount = 0;
      const regfine = 50;
      const spefine = 100;
      const specialfine = 150;
  
      for (let x = 0; x < datess.length; x++) {
        const currentAttendance = attendance[x];
        const currentDay = dayss[x];
  
        if (currentAttendance === 'a' && (currentDay === 'Monday' || currentDay === 'Friday')) {
          fine += spefine;
          absentcount++;
          speciala++;
        } else if (currentAttendance === 'a' && (currentDay === 'Tuesday' || currentDay === 'Wednesday' || currentDay === 'Thursday')) {
          fine += regfine;
          absentcount++;
          regurala++;
        }
      }
  
      const consectivedays =await countConsecutiveAs(attendance,dayss);
  
      for (let x = 0; x < consectivedays.length; x++) {
        if (consectivedays[x] === 5) {
          fine += specialfine;
        }
      }
  
      res.json({ regurala, speciala, fine });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  
  });