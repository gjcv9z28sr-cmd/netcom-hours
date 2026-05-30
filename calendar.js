let currentDate = new Date();

// ----------------------------------------

function getTypeLabel(type) {

  switch (type) {

    case "delegation":
      return "Delegacja";

    case "vacation":
      return "Urlop";

    case "sick":
      return "L4";

    default:
      return "Praca";
  }
}

// ----------------------------------------

function renderCalendar() {

  const calendar =
    document.getElementById(
      "calendar"
    );

  if (!calendar) return;

  calendar.innerHTML = "";

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

  if (monthTitle) {

    monthTitle.innerText =
      `${monthNames[month]} ${year}`;
  }

  const weekDays = [

    "Pn",
    "Wt",
    "Śr",
    "Cz",
    "Pt",
    "Sb",
    "Nd"
  ];

  // ----------------------------------------
  // HEADER DNI TYGODNIA
  // ----------------------------------------

  weekDays.forEach(day => {

    const weekDay =
      document.createElement(
        "div"
      );

    weekDay.className =
      "weekDay";

    weekDay.innerText =
      day;

    calendar.appendChild(
      weekDay
    );
  });

  // ----------------------------------------
  // PARAMETRY MIESIĄCA
  // ----------------------------------------

  const firstDay =
    new Date(
      year,
      month,
      1
    ).getDay();

  const normalizedFirstDay =
    firstDay === 0
      ? 6
      : firstDay - 1;

  const daysInMonth =
    new Date(
      year,
      month + 1,
      0
    ).getDate();

  // ----------------------------------------
  // PUSTE POLA
  // ----------------------------------------

  for (
    let i = 0;
    i < normalizedFirstDay;
    i++
  ) {

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

  // ----------------------------------------
  // DNI MIESIĄCA
  // ----------------------------------------

  for (
    let day = 1;
    day <= daysInMonth;
    day++
  ) {

    const dayBox =
      document.createElement(
        "div"
      );

    dayBox.className =
      "dayBox";

    const dateKey =
      `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const entry =
      entries?.[dateKey];

    // KOLOR

   if (entry?.color) {

  dayBox.style.background =
    entry.color;

  dayBox.style.color =
    "white";

  dayBox.querySelector?.(".dayNumber");
}

    // ETYKIETA

    let typeLabel = "";

    if (entry) {

      typeLabel =
        getTypeLabel(
          entry.type
        );
    }

    // TREŚĆ KAFELKA

    dayBox.innerHTML = `

      <div class="dayNumber">
        ${day}
      </div>

      ${
        typeLabel
          ? `
            <div class="calendarType">
              ${typeLabel}
            </div>
          `
          : ""
      }

      ${
        entry?.notes
          ? `
            <div class="calendarNote">
              📝
            </div>
          `
          : ""
      }
    `;

    // KLIK

    dayBox.addEventListener(
      "click",
      () => {

        if (
          typeof openDayModal ===
          "function"
        ) {

          openDayModal(
            dateKey
          );
        }
      }
    );

    calendar.appendChild(
      dayBox
    );
  }
}

// ----------------------------------------

function prevMonth() {

  currentDate.setMonth(
    currentDate.getMonth() - 1
  );

  renderCalendar();
}

// ----------------------------------------

function nextMonth() {

  currentDate.setMonth(
    currentDate.getMonth() + 1
  );

  renderCalendar();
}

// ----------------------------------------

window.renderCalendar =
  renderCalendar;

window.prevMonth =
  prevMonth;

window.nextMonth =
  nextMonth;