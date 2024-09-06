export default async function generateDateRange(startDate, endDate) {
    let matcher = await queryAsync('select * from attendence.attendence')
    let matcher1 = matcher[0]
    let dateArray = '';
    const start = new Date(startDate.substring(0, 4), parseInt(startDate.substring(4, 6)) - 1, startDate.substring(6, 8));
    const end = new Date(endDate.substring(0, 4), parseInt(endDate.substring(4, 6)) - 1, endDate.substring(6, 8));
  
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
  
      let mydate = ('d'+date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2))+',';
      let test = matcher1[mydate.slice(0, -1)]
      if(typeof test === 'undefined'){
       console.log('undefined')
      }else{
        dateArray= dateArray+mydate
      }
    }
  
    return dateArray.slice(0, -1) ;
  }