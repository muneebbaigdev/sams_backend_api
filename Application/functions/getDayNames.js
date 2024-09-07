function getDayNames(dateArray) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return dateArray.map(dateStr => {
        const date = new Date(dateStr.substring(1, 5), parseInt(dateStr.substring(5, 7)) - 1, dateStr.substring(7, 9));
        return dayNames[date.getDay()];
    });
  }
module.exports = getDayNames