function convertDateFormat(inputDate) {
    const parts = inputDate.split('-');
    return parts[0] + parts[1] + parts[2];
  }
module.exports = convertDateFormat