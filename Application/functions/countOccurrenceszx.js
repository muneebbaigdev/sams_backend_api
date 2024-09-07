function countOccurrenceszx(obj, valueToCount) {
    let count = 0;
  
    // Iterate over the object keys and check if the value matches the one to count
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === valueToCount) {
        count++;
      }
    }
  
    return count;
  }
  module.exports = countOccurrenceszx