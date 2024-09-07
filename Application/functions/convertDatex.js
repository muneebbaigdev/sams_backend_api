function convertDatex(dateString) {
    // Extract the year, month, and day from the input date string
    const year = dateString.slice(1, 5);
    const month = dateString.slice(5, 7);
    const day = dateString.slice(7);
  
    // Concatenate the parts with dashes to get the desired format
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
module.exports = convertDatex