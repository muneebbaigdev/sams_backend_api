async function countConsecutiveAs(arr,dayss) {
    let result = [];
    let count = 0;
  
    for (let i = 0; i < arr.length; i++) {
      
      if (arr[i] === 'a' & count<5) {
        count++;
      }else if(arr[i] === 'p' | arr[i] === 'l' | arr[i] === 'lt'){
        count = 0
      }
  
      if (count === 5 & dayss[i] === 'Friday'){
        result.push(count)
        count = 0
      }
  
      }
      return result
  }
module.exports = countConsecutiveAs