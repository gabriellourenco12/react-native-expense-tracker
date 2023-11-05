export function getFormattedDate(date) {
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
}

export function getFormattedDateShort(date) {
    return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date, days) {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() - days);
    return dateCopy;
}