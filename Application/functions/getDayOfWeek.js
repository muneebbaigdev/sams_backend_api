export default function getDayOfWeek(dateString) {
    // Extract the numeric part of the date string (e.g., "20240321" from "d20240321")
    const numericDate = dateString.substring(1); // Remove the leading 'd'
  
    // Parse the numeric date string into a Date object
    const dateObj = new Date(numericDate.slice(0, 4), numericDate.slice(4, 6) - 1, numericDate.slice(6));
  
    // Array of weekday names
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    const dayIndex = dateObj.getDay();
  
    // Return the corresponding day name from the array
    return daysOfWeek[dayIndex];
  }