export default function getDatesInRange(startDateStr, endDateStr) {
    const dates = [];
    const startDate = new Date(startDateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
    const endDate = new Date(endDateStr.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'));
  
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      dates.push(`${year}${month}${day}`);
    }
  
    return dates;
  }