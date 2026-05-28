let currentDate =
  new Date();

function renderCalendar(){

  const calendar =
    document.getElementById(
      "calendar"
    );

  if(!calendar){

    console.error(
      "Brak #calendar"
    );

    return;
  }

  const monthTitle =
    document.getElementById(
      "monthTitle"
    );

  const month =
    currentDate.getMonth();

  const year =
    currentDate.getFullYear();

  const monthNames = [

    "Styczeń",
    "Luty",
    "Marzec",
    "Kwiecień",
    "Maj",
    "Czerwiec",

    "Lipiec",
    "Sierpień",
    "Wrzesień",
    "Październik",
    "Listopad",
    "Grudzień"
  ];

  if(monthTitle){

    monthTitle.innerText =
      `${monthNames[month]} ${year}`;
  }

  calendar.innerHTML = "";

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  const weekDays = [

    "Pn",
    "Wt",
    "Śr",
    "Cz",
    "Pt",
    "Sb",
    "Nd"
  ];

  // HEADER

  weekDays.forEach(day => {

    const dayEl =
      document.createElement(
        "div"
      );

    dayEl.className =
      "weekDay";

    dayEl.innerText =
      day;

    calendar.appendChild(
      dayEl
    );
  });

  // EMPTY CELLS

  const normalizedFirstDay =
    firstDay === 0
      ? 6
      : firstDay - 1;

  for(
    let i = 0;
    i < normalizedFirstDay;
    i++
  ){

    const empty =
      document.createElement(
        "div"
      );

    empty.className =
      "emptyDay";

    calendar.appendChild(
      empty
    );
  }

  // DAYS

  for(
    let day = 1;
    day <= daysInMonth;
    day++
  ){

    const dayBox =
      document.createElement(
        "div"
      );

    dayBox.className =
      "dayBox";

    dayBox.innerHTML = `

     const dateKey =
  `${year}-${String(month + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;

dayBox.innerHTML = `

  <div class="dayNumber">
    ${day}
  </div>
`;

dayBox.onclick = () => {

  if(
    typeof openDayModal ===
    "function"
  ){

    openDayModal(
      dateKey
    );
  }
};

    calendar.appendChild(
      dayBox
    );
  }
}

function prevMonth(){

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderCalendar();
}

function nextMonth(){

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderCalendar();
}

window.renderCalendar =
  renderCalendar;

window.prevMonth =
  prevMonth;

window.nextMonth =
  nextMonth;