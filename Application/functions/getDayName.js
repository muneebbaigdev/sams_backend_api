function getDayName(inputDate) {
    // Extract year, month, and day from the inputDate string
    const year = inputDate.slice(1, 5);
    const month = inputDate.slice(5, 7) - 1; // Month is zero-based in JavaScript Date object
    const day = inputDate.slice(7, 9);
  
    // Create a new Date object with the extracted year, month, and day
    const dateObj = new Date(year, month, day);
  
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayIndex = dateObj.getDay();
  
    // Define an array of day names
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    // Return the day name corresponding to the dayIndex
    return dayNames[dayIndex];
  }
module.exports = getDayName