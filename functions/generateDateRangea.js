function generateDateRangea(startDate, endDate) {
    let dateArray = [];
    const start = new Date(startDate.substring(0, 4), parseInt(startDate.substring(4, 6)) - 1, startDate.substring(6, 8));
    const end = new Date(endDate.substring(0, 4), parseInt(endDate.substring(4, 6)) - 1, endDate.substring(6, 8));
  
    for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
        dateArray.push('d'+date.getFullYear() + '' + ('0' + (date.getMonth() + 1)).slice(-2) + '' + ('0' + date.getDate()).slice(-2));
    }
  
    return dateArray;
  }
module.exports - generateDateRangea