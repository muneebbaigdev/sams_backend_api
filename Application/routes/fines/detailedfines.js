const express = require('express');
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const getYesterdayIfToday = require("../../functions/getYesterdayIfToday")
const generateDateRange = require("../../functions/generateDateRange")
const generateDateRangea = require("../../functions/generateDateRangea")
const getDayNames = require("../../functions/getDayNames")
const formatDate = require("../../functions/formatDate")
const getDayName = require("../../functions/getDayName")


router.post('/', async (req,res) => {
    console.log(req.body)
    var responseArray = []
    let {admission_number,sdate,ldate} = req.body
    ldate = getYesterdayIfToday(ldate.toString());
    let master = await generateDateRange(sdate.toString(),ldate.toString())
    let query = "SELECT "+master+" FROM attendence.attendence where admission_number = "+admission_number+";"
    const data = await queryAsync(query)
    const datesArray = generateDateRangea(sdate.toString(),ldate.toString())
    const dayNames = getDayNames(generateDateRangea(sdate.toString(),ldate.toString()))
    var consectiveFine = 0
    
    for(var cnt = 0; cnt<datesArray.length; cnt++){
    
    let abc = data[0]
    let dil = datesArray[cnt]
    let fine = 0;
    
    if(abc[dil] === 'a' & dayNames[cnt] === 'Monday' | abc[dil] === 'a' & dayNames[cnt] === 'Friday'){
      fine+=100
    }else if(abc[dil] === 'a' & dayNames[cnt] === 'Tuesday' | abc[dil] === 'a' & dayNames[cnt] === 'Wednesday' | abc[dil] === 'a' & dayNames[cnt] === 'Thursday'){
      fine+=50
    }
    if(abc[dil] === 'a' & dayNames[cnt] === 'Monday' | abc[dil] === 'a' & dayNames[cnt] === 'Friday'){
    
      responseArray.push({date:formatDate(datesArray[cnt]),day:dayNames[cnt],status:'Special Absent',fine:fine})
    
    }else if(abc[dil] === 'a' & dayNames[cnt] === 'Tuesday' | abc[dil] === 'a' & dayNames[cnt] === 'Wednesday' | abc[dil] === 'a' & dayNames[cnt] === 'Thursday'){
    
    responseArray.push({date:formatDate(datesArray[cnt]),day:dayNames[cnt],status:'Regular Absent',fine:fine})
    
    }else if(dayNames[cnt] === 'Saturday' | dayNames[cnt] === 'Sunday'){
    // console.log('holiday no listing')
    }
    else if(abc[dil] === 'p'){
      responseArray.push({date:formatDate(datesArray[cnt]),day:dayNames[cnt],status:"Present",fine:fine})
    }
    else if(abc[dil] === 'l'){
      responseArray.push({date:formatDate(datesArray[cnt]),day:dayNames[cnt],status:"Leave",fine:fine})
    }
    else if(abc[dil] === 'lt'){
      responseArray.push({date:formatDate(datesArray[cnt]),day:dayNames[cnt],status:"Late",fine:fine})
    }
    
    const dday = getDayName(datesArray[cnt])
    
    if(abc[dil] === 'a' & consectiveFine < 5){
      consectiveFine++
    }else if(abc[dil] === 'p' | abc[dil] === 'l' | abc[dil] === 'lt'){
      consectiveFine = 0
    }
    
    if(consectiveFine === 5 & dday === 'Friday'){
      consectiveFine = 0
      responseArray.push({date:formatDate(datesArray[cnt]),day:dayNames[cnt],status:"Consective 5 Absent",fine:150})
    
    }
    
    }
    
    res.send(responseArray)
    
    })
    module.exports = router