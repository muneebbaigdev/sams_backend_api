export default function formatDate(dateStr) {
    const year = dateStr.substring(1, 5);
    const month = dateStr.substring(5, 7);
    const day = dateStr.substring(7, 9);
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[parseInt(month) - 1];
  
    return `${day}-${monthName}-${year}`;
  }