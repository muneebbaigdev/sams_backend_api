const express = require('express')
const router = express.Router()
const queryAsync = require('../../functions/queryAsync')

router.post('/',async(req,res)=>{
    const authorize = await queryAsync("select *from attendence.employees where password = '"+req.body.token+"';")
    if(authorize.length===1){
  const {selectedYear,sdate,edate} = req.body
  const resu = await queryAsync("select * from attendence.sessiondates where session = '"+selectedYear+"';")
  const query = "INSERT INTO `attendence`.`sessiondates` (`session`, `startdate`, `enddate`) VALUES ('"+selectedYear+"', '"+sdate+"', '"+edate+"');"
  if(resu.length===0){
    await queryAsync(query)
    res.send({error:false})
  }else{
    res.send({error:true})
  }
    }
  })
  module.exports = router