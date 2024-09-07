const express = require('express');
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const formatDatex = require('../../functions/formatDatex')
const groupDatesIntoWeeks = require('../../functions/groupDatesIntoWeeks')
const groupDatesIntoMonths = require('../../functions/groupDatesIntoMonths')
const givemonth = require('../../functions/givemonth')
const groupDatesIntoYears = require('../../functions/groupDatesIntoYears')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  const {crietaria,duration,dates,shift} = req.body
  const qry = "SELECT * FROM attendence.attendence left join attendence.students on attendence.attendence.admission_number = attendence.students.admission_number where shift = '"+shift+"';"
  const match = await queryAsync(qry)
  var newqry = "attendence.admission_number,"
  var newqryarray = []
  var perdateans = []
  var labels = []
  var presentd = []
  var absentd = []
  var leaved = []
  var lated = []
  
  for(var i=0; i<dates.length; i++){
    const mc = match[0]
    const tc = dates[i]
    if(mc[tc] === undefined){
  
    }else{
    newqry = newqry +tc+ ","
    newqryarray.push(tc)
    labels.push(formatDatex(tc))
    }
  }
  newqry = newqry.slice(0,-1)
  newqry = "Select "+newqry+",shift FROM attendence.attendence left join attendence.students on attendence.attendence.admission_number = attendence.students.admission_number where shift = '"+shift+"';"
  const result =await queryAsync(newqry)
  var countpresentindate = 0
  var countabsentindate = 0
  var countleaveindate = 0
  var countlateindate = 0
  var countpresentindate1 = 0
  var countabsentindate1 = 0
  var countleaveindate1 = 0
  var countlateindate1 = 0
  for(var t=0; t<newqryarray.length; t++){
  
    for(var i=0; i<result.length; i++){
      const ree = result[i]
      const eee = newqryarray[t]
  
      if(ree[eee]==='p'){
          countpresentindate++
          countpresentindate1++
      }else if(ree[eee]==='a'){
          countabsentindate++
          countabsentindate1++
      }else if(ree[eee]==='l'){
          countleaveindate++
          countleaveindate1++
      }else if(ree[eee]==='lt'){
          countlateindate++
          countlateindate1++
      }
    }
    perdateans.push({countpresentindate,countabsentindate,countleaveindate,countlateindate})
      countpresentindate = 0
      countabsentindate = 0
      countleaveindate = 0
      countlateindate = 0
  }
  const total = countpresentindate1+countabsentindate1+countleaveindate1+countlateindate1
  
  for(var i=0; i<perdateans.length; i++){
  
    const total = perdateans[i].countpresentindate+perdateans[i].countabsentindate+perdateans[i].countleaveindate+perdateans[i].countlateindate
    presentd.push(perdateans[i].countpresentindate)
    absentd.push(perdateans[i].countabsentindate)
    leaved.push(perdateans[i].countleaveindate)
    lated.push(perdateans[i].countlateindate)
  
  
  
  
  }
  
  if(crietaria==='daily'){
  
  
    res.send({
      perdateans,
      tstr:result.length,
      tp:Math.round((countpresentindate1*100)/total),
      ta:Math.round((countabsentindate1*100)/total),
      tl:Math.round((countleaveindate1*100)/total),
      tlt:Math.round((countlateindate1*100)/total),
      labels,
      presentd,
      absentd,
      leaved,
      lated
    })
  }else if(crietaria==='weekly'){
    const upnp = await groupDatesIntoWeeks(labels)
    var ulabels = []
    var upresentd = []
    var uabsentd = []
    var uleaved = []
    var ulated = []
   
    for(var i=0; i<upnp.length; i++){
      ulabels.push("Week "+(i+1).toString())
      var alpha = upnp[i]
      var p=0
      var a=0
      var l=0
      var lt=0
    
      for(var k=0; k<alpha.length; k++){
        var test = alpha[k]
        p = p+presentd[test]
        a = a+absentd[test]
        l = l+leaved[test]
        lt = lt+lated[test]   
      }
  
      var delta = result.length*alpha.length
      upresentd.push(Math.round((p*100)/delta))
      uabsentd.push(Math.round((a*100)/delta))
      uleaved.push(Math.round((l*100)/delta))
      ulated.push(Math.round((lt*100)/delta))
    }
  
    res.send({
     
      tstr:result.length,
      tp:Math.round((countpresentindate1*100)/total),
      ta:Math.round((countabsentindate1*100)/total),
      tl:Math.round((countleaveindate1*100)/total),
      tlt:Math.round((countlateindate1*100)/total),
      labels:ulabels,
      presentd:upresentd,
      absentd:uabsentd,
      leaved:uleaved,
      lated:ulated
    })
  
  }else if(crietaria==='monthly'){
  
    const upnp = await groupDatesIntoMonths(labels)
    const zara = []
    for(var i=0; i<dates.length; i++){
     var n = convertDatex(dates[i])
     var x =n.slice(5,7)
     const eel = givemonth(x)
     var tnt = (zara[zara.length-1])
     if(tnt === undefined){
       zara.push(eel)
     }else if(zara[zara.length-1] != eel){
       zara.push(eel)
     }
    }
    var ulabels = []
    var upresentd = []
    var uabsentd = []
    var uleaved = []
    var ulated = []
  
    for(var i=0; i<upnp.length; i++){
      ulabels.push(zara[i])
      var alpha = upnp[i]
      var p=0
      var a=0
      var l=0
      var lt=0
    
      for(var nn=0; nn<alpha.length; nn++){
        var test = alpha[nn]
        p = p+presentd[test]
        a = a+absentd[test]
        l = l+leaved[test]
        lt = lt+lated[test]
      }
      var delta = result.length*alpha.length
      upresentd.push(Math.round((p*100)/delta))
      uabsentd.push(Math.round((a*100)/delta))
      uleaved.push(Math.round((l*100)/delta))
      ulated.push(Math.round((lt*100)/delta))
    }
  
    res.send({
     
      tstr:result.length,
      tp:Math.round((countpresentindate1*100)/total),
      ta:Math.round((countabsentindate1*100)/total),
      tl:Math.round((countleaveindate1*100)/total),
      tlt:Math.round((countlateindate1*100)/total),
      labels:ulabels,
      presentd:upresentd,
      absentd:uabsentd,
      leaved:uleaved,
      lated:ulated
    })
  
  }else if(crietaria==='yearly'){
  
    const upnp = await groupDatesIntoYears(labels)
    var ulabels = []
    var upresentd = []
    var uabsentd = []
    var uleaved = []
    var ulated = []
    for(var i=0; i<upnp.length; i++){
  
      var alpha = upnp[i]
      var ps2 = alpha[i]
      if (ulabels[ulabels.length-1]!==dates[ps2].slice(1,5)){
        ulabels.push(dates[ps2].slice(1,5))
      }
      
      var p=0
      var a=0
      var l=0
      var lt=0
      for(var nn=0; nn<alpha.length; nn++){
        var test = alpha[nn]
        p = p+presentd[test]
        a = a+absentd[test]
        l = l+leaved[test]
        lt = lt+lated[test]
      }
      var delta = result.length*alpha.length
      upresentd.push(Math.round((p*100)/delta))
      uabsentd.push(Math.round((a*100)/delta))
      uleaved.push(Math.round((l*100)/delta))
      ulated.push(Math.round((lt*100)/delta))
    }
    res.send({
     
      tstr:result.length,
      tp:Math.round((countpresentindate1*100)/total),
      ta:Math.round((countabsentindate1*100)/total),
      tl:Math.round((countleaveindate1*100)/total),
      tlt:Math.round((countlateindate1*100)/total),
      labels:ulabels,
      presentd:upresentd,
      absentd:uabsentd,
      leaved:uleaved,
      lated:ulated
    })
  }
  
    }
  
  })
  module.exports = router