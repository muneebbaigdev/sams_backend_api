const express = require('express');
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const formatDatex = require('../../functions/formatDatex')
const groupDatesIntoWeeks = require('../../functions/groupDatesIntoWeeks')
const groupDatesIntoMonths = require('../../functions/groupDatesIntoMonths')
const givemonth = require('../../functions/givemonth')
const convertDatex = require('../../functions/convertDatex')
const groupDatesIntoYears = require('../../functions/groupDatesIntoYears')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
    const {crietaria,duration,dates,classn,section} = req.body
  
    const qry = "SELECT * FROM students JOIN attendence ON students.admission_number = attendence.admission_number where class = '"+classn+"' and section = '"+section+"';"
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
  
      newqry = newqry +'attendence.'+tc+ ","
      newqryarray.push(tc)
      labels.push(formatDatex(tc))
      }
    }
    newqry = newqry.slice(0,-1)
    newqry = "SELECT "+newqry+" FROM students JOIN attendence ON students.admission_number = attendence.admission_number WHERE students.class = '"+classn+"' and students.section = '"+section+"';"
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
  
        var pb=0
        var ab=0
        var lb=0
        var ltb=0
        var tttrt = 0
        
        for(var l=0; l<alpha.length; l++){
          tttrt = alpha.length*result.length
          var test = alpha[l]
          pb = (pb+presentd[test])
          ab = (ab+absentd[test])
          lb = (lb+leaved[test])
          ltb = (ltb+lated[test])
  
        }
  
        upresentd.push(Math.round((pb*100)/tttrt))
        uabsentd.push(Math.round((ab*100)/tttrt))
        uleaved.push(Math.round((lb*100)/tttrt))
        ulated.push(Math.round((ltb*100)/tttrt))
        
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
   
     console.log(zara)
      var ulabels = []
      var upresentd = []
      var uabsentd = []
      var uleaved = []
      var ulated = []
      for(var i=0; i<upnp.length; i++){
    
        ulabels.push(zara[i])
    
        var alpha = upnp[i]
        var pc=0
        var ac=0
        var lc=0
        var ltc=0
        var tttrt = 0
        for(var nn=0; nn<alpha.length; nn++){
    
          var test = alpha[nn]
          tttrt = alpha.length*result.length
          pc = pc+presentd[test]
          ac = ac+absentd[test]
          lc = lc+leaved[test]
          ltc = ltc+lated[test]
    
        }
        upresentd.push(Math.round((pc*100)/tttrt))
        uabsentd.push(Math.round((ac*100)/tttrt))
        uleaved.push(Math.round((lc*100)/tttrt))
        ulated.push(Math.round((ltc*100)/tttrt))
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
   
        var pd=0
        var ad=0
        var ld=0
        var ltd=0
        var tttrt = 0
        for(var nn=0; nn<alpha.length; nn++){
          tttrt = alpha.length*result.length
          var test = alpha[nn]
          pd = pd+presentd[test]
          ad = ad+absentd[test]
          ld = ld+leaved[test]
          ltd = ltd+lated[test]
        }
        upresentd.push(Math.round((pd*100)/tttrt))
        uabsentd.push(Math.round((ad*100)/tttrt))
        uleaved.push(Math.round((ld*100)/tttrt))
        ulated.push(Math.round((ltd*100)/tttrt))
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