function createCalendar(elementId, weeks) {
    const container = document.getElementById(elementId);
    const startDate = new Date();
    for (let i = 0; i < weeks * 7; i++) {
        const day = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        
        // Check if the day is a weekend
        if (day.getDay() === 0 || day.getDay() === 6) { // 0 for Sunday, 6 for Saturday
            dayElement.classList.add('weekend'); // Add the 'weekend' class
        }

        dayElement.innerHTML = `<span>${day.getDate()}</span>${day.toLocaleDateString('default', { weekday: 'long' })}`;
        container.appendChild(dayElement);
    }
}

createCalendar('calendar', 3);
// New JavaScript code for fetching and processing the CSV file
fetch('schedule.csv')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        lines.forEach(line => {
            const fields = line.split(',');
            // fields[0], fields[1], etc. now contain the data from the CSV fields
            // You can use this data to update your calendar
        });
    })
    .catch(error => console.error('Error:', error));