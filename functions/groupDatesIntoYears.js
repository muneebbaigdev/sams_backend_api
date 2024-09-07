function groupDatesIntoYears(dates) {
    // Convert dates to JavaScript Date objects
    const dateObjects = dates.map(dateString => new Date(dateString));
    
    const years = [];
    let currentYear = [];
    let yearStartIndex = 0;
    
    for (let i = 0; i < dateObjects.length; i++) {
        const currentDate = dateObjects[i];
        const currentYearValue = currentDate.getFullYear();
    
        // If it's a new year, add the previous year to the years array
        if (currentYearValue !== dateObjects[yearStartIndex].getFullYear() || i === 0) {
            if (currentYear.length > 0) {
                years.push(currentYear);
            }
            currentYear = [];
            yearStartIndex = i;
        }
    
        // Add the index of the date to the current year
        currentYear.push(i);
    }
    
    // Add the last year if it's not empty
    if (currentYear.length > 0) {
        years.push(currentYear);
    }
    
    return years;
    }
module.exports = groupDatesIntoYears