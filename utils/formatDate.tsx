const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];
function formatDate(inputDate: string): string {
    // Parse the input date
    const [datePart, timePart] = inputDate.split(' ');
    const [day, month, year] = datePart.split('-').map(Number);
    const [hour, minute, second] = timePart.split(':').map(Number);

    // Create a Date object
    const date = new Date(year, month - 1, day, hour, minute, second);

    // Format month names

    // Get AM/PM format
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; // Convert 24-hour format to 12-hour

    // Construct the formatted string
    return `${day} ${months[month - 1]}' ${String(year).slice(2)} ${formattedHour}:${minute.toString().padStart(2, '0')} ${period}`;
}
function getDate(inputDate: string): { day: number; month: number; year: number } {
    const [datePart, timePart] = inputDate.split(' ');
    const [day, month, year] = datePart.split('-').map(Number)
    return { day, month, year }
}
export default formatDate
export { getDate }