export default function groupDatesIntoMonths(dates) {
    // Convert dates to JavaScript Date objects
    const dateObjects = dates.map(dateString => new Date(dateString));
    
    const months = [];
    let currentMonth = [];
    let monthStartIndex = 0;
    
    for (let i = 0; i < dateObjects.length; i++) {
        const currentDate = dateObjects[i];
        const currentMonthValue = currentDate.getMonth();
    
        // If it's a new month, add the previous month to the months array
        if (currentMonthValue !== dateObjects[monthStartIndex].getMonth() || i === 0) {
            if (currentMonth.length > 0) {
                months.push(currentMonth);
            }
            currentMonth = [];
            monthStartIndex = i;
        }
    
        // Add the index of the date to the current month
        currentMonth.push(i);
    }
    
    // Add the last month if it's not empty
    if (currentMonth.length > 0) {
        months.push(currentMonth);
    }
    
    return months;
    }