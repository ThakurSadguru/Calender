// Get references to the necessary elements
const monthYearElement = document.getElementById('monthYear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentDate = new Date();

// Function to update the calendar
function updateCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get the first and last day of the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Get the total number of days in the current month
  const totalDays = lastDay.getDate();

  // Get the starting weekday index for the 1st day of the month (0 = Sunday, 1 = Monday, etc.)
  const firstDayIndex = firstDay.getDay();

  // Get the month name and year to display at the top
  const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  monthYearElement.textContent = monthYearString;

  // Generate the HTML for the calendar dates
  let datesHtml = '';

  // Add previous month's dates (inactive days) to fill up the first row
  for (let i = 0; i < firstDayIndex; i++) {
    const prevMonthDate = new Date(year, month, -i); // Negative day number gives dates from previous month
    datesHtml += `<div class="date inactive">${prevMonthDate.getDate()}</div>`;
  }

  // Add the current month's dates
  for (let i = 1; i <= totalDays; i++) {
    const date = new Date(year, month, i);
    const isToday = date.toDateString() === new Date().toDateString(); // Check if it's today's date
    const activeClass = isToday ? 'active' : '';
    datesHtml += `<div class="date ${activeClass}">${i}</div>`;
  }

  // Add next month's dates (inactive days) to fill the last row
  const lastDayIndex = lastDay.getDay();
  for (let i = 1; i <= 6 - lastDayIndex; i++) {
    const nextMonthDate = new Date(year, month + 1, i);
    datesHtml += `<div class="date inactive">${nextMonthDate.getDate()}</div>`;
  }

  // Update the calendar's dates section with the generated HTML
  datesElement.innerHTML = datesHtml;
}

// Event listener for the "Previous" button (go back one month)
prevBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1); // Move to the previous month
  updateCalendar();
});

// Event listener for the "Next" button (go forward one month)
nextBtn.addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
  updateCalendar();
});

// Initialize the calendar on page load
updateCalendar();
