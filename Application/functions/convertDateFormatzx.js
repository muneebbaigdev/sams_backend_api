export default function convertDateFormatzx(dateString) {
    // Split the input date string by '-'
    const parts = dateString.split('-');
    
    // Reconstruct the date in 'yyyymmdd' format
    const formattedDate = `${parts[0]}${parts[1].padStart(2, '0')}${parts[2].padStart(2, '0')}`;
    
    return formattedDate;
  }