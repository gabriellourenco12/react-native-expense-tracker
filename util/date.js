export function getFormattedDate(date) {
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'});
}

export function getDateMinusDays(date, days) {
    const dateCopy = new Date(date);
    dateCopy.setDate(dateCopy.getDate() - days);
    return dateCopy;
}