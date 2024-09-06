export default function getCurrentDatetx() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();
  
    // Format the day with leading zero if needed
    const formattedDay = day < 10 ? `0${day}` : day;
  
    // Format the date with the day, month name, and year
    const formattedDate = `${formattedDay}-${monthNames[monthIndex]}-${year}`;
  
    return formattedDate;
  }