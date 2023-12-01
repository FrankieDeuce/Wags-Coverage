function createCalendar(elementId, weeks) {
    const container = document.getElementById(elementId);
    const startDate = new Date();
    for (let i = 0; i < weeks * 7; i++) {
        const day = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + i);
        const dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.innerHTML = `<span>${day.getDate()}</span>${day.toLocaleDateString('default', { weekday: 'long' })}`;
        container.appendChild(dayElement);
    }
}

createCalendar('calendar', 3);
