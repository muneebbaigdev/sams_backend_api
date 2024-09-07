function groupDatesIntoWeeks(dates) {
    // Convert dates to JavaScript Date objects
    const dateObjects = dates.map(dateString => new Date(dateString));
    
    const weeks = [];
    let currentWeek = [];
    let weekStartIndex = 0;
    
    for (let i = 0; i < dateObjects.length; i++) {
        const currentDate = dateObjects[i];
        const currentDay = currentDate.getDay();
    
        // Skip weekends
        if (currentDay === 0 || currentDay === 6) {
            continue;
        }
    
        // If it's a new week, add the previous week to the weeks array
        if (currentDay === 1 || i === 0) {
            if (currentWeek.length > 0) {
                weeks.push(currentWeek);
            }
            currentWeek = [];
            weekStartIndex = i;
        }
    
        // Add the index of the date to the current week
        currentWeek.push(i);
    }
    
    // Add the last week if it's not empty
    if (currentWeek.length > 0) {
        weeks.push(currentWeek);
    }
    
    return weeks;
    }
module.exports = groupDatesIntoWeeks