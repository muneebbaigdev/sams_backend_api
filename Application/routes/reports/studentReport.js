const express = require('express');
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')
const groupDatesIntoMonths = require('../../functions/groupDatesIntoMonths')
const groupDatesIntoWeeks = require('../../functions/groupDatesIntoWeeks')
const groupDatesIntoYears = require('../../functions/groupDatesIntoYears')
const formatDatex = require('../../functions/formatDatex')
const getDayOfWeek = require('../../functions/getDayOfWeek')
const countOccurrenceszx = require('../../functions/countOccurrenceszx')
const convertDatex = require('../../functions/convertDatex')

router.post('/', async (req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  
  const {admission_number,dates,crietaria} = req.body
  
  const qry = "SELECT * FROM students JOIN attendence ON students.admission_number = attendence.admission_number where attendence.admission_number = '"+admission_number+"';"
  const match = await queryAsync(qry)
  var newqry = "attendence.admission_number,"
    var newqryarray = []
    var perdateans = []
    var labels = []
    var presentd = []
    var absentd = []
    var leaved = []
    var lated = []
    var totaldays = 0
    for(var i=0; i<dates.length; i++){
  
      const mc = match[0]
      const tc = dates[i]
      if(mc[tc] === undefined){
    
      }else{
      totaldays++
      newqry = newqry +'attendence.'+tc+ ","
      newqryarray.push(tc)
      labels.push(formatDatex(tc))
      }
    }
    newqry = newqry.slice(0,-1)
    newqry = "SELECT "+newqry+" FROM students JOIN attendence ON students.admission_number = attendence.admission_number where attendence.admission_number = '"+admission_number+"';"
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
        pushup:[],
        perdateans,
        tstr:totaldays,
        tp:Math.round((countpresentindate1*100)/total),
        ta:Math.round((countabsentindate1*100)/total),
        tl:Math.round((countleaveindate1*100)/total),
        tlt:Math.round((countlateindate1*100)/total),
        tp1:countpresentindate1,
        ta1:countabsentindate1,
        tl1:countleaveindate1,
        tlt1:countlateindate1,
        labels,
        presentd,
        absentd,
        leaved,
        lated
      })
    }else if(crietaria==='weekly'){
      var pushup = []
      var fillpush = {}
      const upnp = await groupDatesIntoWeeks(labels)
      var ulabels = []
      var upresentd = []
      var uabsentd = []
      var uleaved = []
      var ulated = []
      for(var i=0; i<upnp.length; i++){
        fillpush = {week:'',monday:'',tuesday:'',wednesday:'',thursday:'',friday:'',days:0,present:0,absent:0,leave:0,late:0}
        ulabels.push("Week "+(i+1).toString())
        fillpush.week = "Week "+(i+1).toString()
        var alpha = upnp[i]
        var pa=0
        var aa=0
        var la=0
        var lta=0
  
        for(var l=0; l<alpha.length; l++){
          var test = alpha[l]
          var dayx = getDayOfWeek(dates[test])
          if(dayx === 'Monday'){
  
            if(presentd[test]===1){
              fillpush.monday = 'P'
            }else if(absentd[test] === 1){
              fillpush.monday = 'A'
            }else if(leaved[test]===1){
              fillpush.monday = 'L'
            }else if(lated[test]===1){
              fillpush.monday = 'LT'
            }
  
          }else if(dayx === 'Tuesday'){
            if(presentd[test]===1){
              fillpush.tuesday = 'P'
            }else if(absentd[test] === 1){
              fillpush.tuesday = 'A'
            }else if(leaved[test]===1){
              fillpush.tuesday = 'L'
            }else if(lated[test]===1){
              fillpush.tuesday = 'LT'
            }
          }else if(dayx === 'Wednesday'){
            if(presentd[test]===1){
              fillpush.wednesday = 'P'
            }else if(absentd[test] === 1){
              fillpush.wednesday = 'A'
            }else if(leaved[test]===1){
              fillpush.wednesday = 'L'
            }else if(lated[test]===1){
              fillpush.wednesday = 'LT'
            }
          }else if(dayx === 'Thursday'){
            if(presentd[test]===1){
              fillpush.thursday = 'P'
            }else if(absentd[test] === 1){
              fillpush.thursday = 'A'
            }else if(leaved[test]===1){
              fillpush.thursday = 'L'
            }else if(lated[test]===1){
              fillpush.thursday = 'LT'
            }
          }else if(dayx === 'Friday'){
            if(presentd[test]===1){
              fillpush.friday = 'P'
            }else if(absentd[test] === 1){
              fillpush.friday = 'A'
            }else if(leaved[test]===1){
              fillpush.friday = 'L'
            }else if(lated[test]===1){
              fillpush.friday = 'LT'
            }
          }
          pa = pa+presentd[test]
          aa = aa+absentd[test]
          la = la+leaved[test]
          lta = lta+lated[test]
          fillpush.days = 5
          fillpush.present = countOccurrenceszx(fillpush,'P')
          fillpush.absent = countOccurrenceszx(fillpush,'A')
          fillpush.leave = countOccurrenceszx(fillpush,'L')
          fillpush.late = countOccurrenceszx(fillpush,'LT')
  
        }
        pushup.push(fillpush)
        upresentd.push(pa)
        uabsentd.push(aa)
        uleaved.push(la)
        ulated.push(lta)
    
      }
  
      res.send({
        pushup,
        tstr:total,
        tp:(Math.round((countpresentindate1*100)/total)),
        ta:(Math.round((countabsentindate1*100)/total)),
        tl:(Math.round((countleaveindate1*100)/total)),
        tlt:(Math.round((countlateindate1*100)/total)),
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
        
        var pb=0
        var ab=0
        var lb=0
        var ltb=0
     
        
        for(var nn=0; nn<alpha.length; nn++){
    
          var test = alpha[nn]
     
          pb = pb+presentd[test]
          ab = ab+absentd[test]
          lb = lb+leaved[test]
          ltb = ltb+lated[test]
    
        }
    
        upresentd.push(pb)
        uabsentd.push(ab)
        uleaved.push(lb)
        ulated.push(ltb)
      }
    
      res.send({
        pushup:[],
        tstr:totaldays,
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
        var pc=0
        var ac=0
        var lc=0
        var ltc=0
        for(var nn=0; nn<alpha.length; nn++){
          var test = alpha[nn]
          pc = pc+presentd[test]
          ac = ac+absentd[test]
          lc = lc+leaved[test]
          ltc = ltc+lated[test]
        }
        upresentd.push(pc)
        uabsentd.push(ac)
        uleaved.push(lc)
        ulated.push(ltc)
      }
      res.send({
        pushup:[],
        tstr:totaldays,
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