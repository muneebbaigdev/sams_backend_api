export default function getYesterdayIfToday(dateStr) {
    // Get today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Month is zero-based, so add 1
    const day = today.getDate();
  
    // Convert today's date to string format YYYYMMDD
    const todayStr = `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}`;
  
    // Compare the input date with today's date
    if (dateStr === todayStr) {
        // If input date is today, decrement it by one day to get yesterday's date
        const inputDate = new Date(year, month - 1, day);
        inputDate.setDate(inputDate.getDate() - 1);
  
        // Format yesterday's date as YYYYMMDD
        const yearYesterday = inputDate.getFullYear();
        const monthYesterday = (inputDate.getMonth() + 1).toString().padStart(2, '0');
        const dayYesterday = inputDate.getDate().toString().padStart(2, '0');
        return `${yearYesterday}${monthYesterday}${dayYesterday}`;
    } else {
        // If input date is not today, return it as is
        return dateStr;
    }
  }