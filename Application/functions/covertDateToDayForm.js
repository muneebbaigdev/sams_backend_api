function convertDateToDayForm(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6);
  
    const dateObj = new Date(`${year}-${month}-${day}`);
    const dayOfWeek = dateObj.toLocaleString('en-us', { weekday: 'long' });
  
    return dayOfWeek;
  }
module.exports = convertDateToDayForm