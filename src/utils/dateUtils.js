export function formatDateToShort(dateString) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const dateObj = new Date(dateString);
  const month = months[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, "0");

  return `${month} ${day}`;
}
