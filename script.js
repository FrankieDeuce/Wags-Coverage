function convertTo12Hour(time) {
    const [hour, minute] = time.split(':').map(Number);
    const period = hour < 12 ? 'AM' : 'PM';
    const hour12 = hour <= 12 ? hour : hour - 12;
    const minutePadded = String(minute).padStart(2, '0'); // Pad the minute with a leading zero if necessary
    return `${hour12}:${minutePadded} ${period}`;
}

function createCalendar(elementId, dates) {
    const container = document.getElementById(elementId);
    dates.forEach(date => {
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerHTML = `<span>${date}</span>`;
        dayElement.addEventListener('click', () => {
            const messageElement = document.getElementById('message');
            messageElement.textContent = 'Call or text (848) 223 - 4125 now to schedule!';
        });
        container.appendChild(dayElement);
    });
}

// Fetch the CSV file and process the data
fetch('schedule.csv')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n').slice(1); // Skip the first line
        const dates = lines.map(line => {
            if (!line.trim()) return null; // Skip empty lines
        
            const [date, startTime, endTime] = line.split(',');
            const [year, month, day] = date.split('-');
            const formattedDate = `${month}/${day}/${year}`;
            const parsedDate = new Date(formattedDate);
            if (isNaN(parsedDate)) {
                console.error(`Invalid date in CSV: ${date}`); // Debug line
                return null;
            }
            const displayDate = `<span class="date">${parsedDate.toLocaleDateString()}</span><span class="time">${convertTo12Hour(startTime)}-${convertTo12Hour(endTime)}</span>`;
            return displayDate;
        }).filter(date => date !== null); // Remove any null dates

        console.log(`Fetched dates: ${dates}`); // Debug line

        createCalendar('calendar', dates);
    });