function formatDatex(dateString) {
    const year = dateString.substring(1, 5);
    const month = dateString.substring(5, 7);
    const day = dateString.substring(7, 9);
  
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthName = months[parseInt(month, 10) - 1];
  
    return `${day}-${monthName}-${year}`;
  }
module.exports = formatDatex