const monthNames = [
  "Styczeń","Luty","Marzec","Kwiecień",
  "Maj","Czerwiec","Lipiec","Sierpień",
  "Wrzesień","Październik","Listopad","Grudzień"
];

let currentDate = new Date();

function renderCalendar(){

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  document.getElementById("monthTitle").innerText =
    `${monthNames[month]} ${year}`;

  const calendar =
    document.getElementById("calendarDays");

  calendar.innerHTML = "";

  let firstDay =
    new Date(year,month,1).getDay();

  firstDay = firstDay === 0 ? 6 : firstDay - 1;

  const daysInMonth =
    new Date(year,month+1,0).getDate();

  for(let i=0;i<firstDay;i++){

    const empty =
      document.createElement("div");

    empty.className = "day empty";

    calendar.appendChild(empty);
  }

  for(let day=1; day<=daysInMonth; day++){

    const fullDate =
      `${year}-${String(month+1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

    const dayBox =
      document.createElement("div");

    dayBox.className = "day";

    const dayEntries =
      entries[fullDate] || [];

    if(dayEntries.length > 0){

      dayBox.classList.add("has-entry");

      const type = dayEntries[0].type;

      if(type === "Praca"){
        dayBox.style.background =
          CONFIG.colors.work;
      }

      if(type === "Urlop"){
        dayBox.style.background =
          CONFIG.colors.vacation;
      }

      if(type === "L4"){
        dayBox.style.background =
          CONFIG.colors.sick;
      }

      if(type === "Delegacja"){
        dayBox.style.background =
          CONFIG.colors.delegation;
      }
    }

    let totalHours = 0;

    dayEntries.forEach(entry => {
      totalHours += Number(entry.hours || 0);
    });

    let hoursHtml = "";

    if(totalHours > 0){

      hoursHtml =
        `<div class="hours-badge">${totalHours.toFixed(1)} h</div>`;
    }

    dayBox.innerHTML = `
      <div class="day-number">${day}</div>
      ${hoursHtml}
    `;

    dayBox.onclick = () => openModal(fullDate);

    calendar.appendChild(dayBox);
  }

  updateSummary();

  updateVacationCounter();
}

function changeMonth(direction){

  currentDate.setMonth(
    currentDate.getMonth() + direction
  );

  renderCalendar();
}
window.changeMonth = changeMonth;
window.renderCalendar = renderCalendar;