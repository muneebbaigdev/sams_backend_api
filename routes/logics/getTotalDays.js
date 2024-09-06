const express = require('express')
const router = express.Router()
import queryAsync from '../../functions/queryAsync'
import countOccurrences from "./functions/countOccurrences";
import convertDate from "./functions/convertDate";
import getDatesInRange from "./functions/getDatesInRange";


router.post('/',async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  
    const sdate = convertDate(req.body.sdate)
    const ldate = convertDate(req.body.ldate)
    const stuadn = req.body.stuadn
    const darray =await getDatesInRange(sdate,ldate)
    const data = await queryAsync("select * from attendence.attendence;")
    const data1 = data[0]
  
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
    const totalp = countOccurrences(attendancearray, 'p');
    const totala = countOccurrences(attendancearray, 'a');
    const totall = countOccurrences(attendancearray, 'l');
    const totallt = countOccurrences(attendancearray, 'lt');
    var firstwarning='Expecting';
    var secondwarning='Expecting';
    var thirdwarning='Expecting';
    var x = 0;
    async function formatDateabc(inputDate) {
      // Extract year, month, and day from the input string
      const year = inputDate.slice(0, 4);
      const month = inputDate.slice(4, 6);
      const day = inputDate.slice(6, 8);
    
      // Create an array of month names
      const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
      ];
    
      // Get the month name based on the month value (subtract 1 since months are zero-indexed)
      const formattedMonth = monthNames[parseInt(month, 10) - 1];
    
      // Construct the final formatted date
      const formattedDate = `${day}-${formattedMonth}-${year}`;
      return formattedDate.toString();
    }
    for(var i=0; i<rightarray1.length; i++){
  
      if(attendancearray[i]==='a'){
        x++
        if(x===10){
          firstwarning = rightarray1[i].slice(1)
          const dsfj = await formatDateabc(firstwarning)
          firstwarning = dsfj
        }else if(x===20){
          secondwarning = rightarray1[i].slice(1)
          const dsfj = await formatDateabc(secondwarning)
          secondwarning = dsfj
        }else if(x===30){
          thirdwarning = rightarray1[i].slice(1)
          const dsfj = await formatDateabc(thirdwarning)
          thirdwarning = dsfj
        }
  
      }
  
  
    }
    const counter = rightarray1.length
    
    res.send({totaldays:counter,totalp,totala,totall,totallt,firstwarning,secondwarning,thirdwarning})
  }
  })