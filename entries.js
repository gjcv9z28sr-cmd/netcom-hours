let selectedDate = null;

// ----------------------------------

function openDayModal(dateKey){

  selectedDate = dateKey;

  const modal =
    document.getElementById(
      "dayModal"
    );

  if(!modal) return;

  modal.classList.remove(
    "hidden"
  );

  document.getElementById(
    "modalDate"
  ).innerText =
    dateKey;

  const existing =
    entries[dateKey];

  if(existing){

    document.getElementById(
      "entryType"
    ).value =
      existing.type || "work";

    document.getElementById(
      "startTime"
    ).value =
      existing.startTime || "";

    document.getElementById(
      "endTime"
    ).value =
      existing.endTime || "";

    document.getElementById(
      "orderNumber"
    ).value =
      existing.orderNumber || "";

  }else{

    document.getElementById(
      "entryType"
    ).value =
      "work";

    document.getElementById(
      "startTime"
    ).value =
      "";

    document.getElementById(
      "endTime"
    ).value =
      "";

    document.getElementById(
      "orderNumber"
    ).value =
      "";
  }
}

// ----------------------------------

function closeDayModal(){

  document
    .getElementById(
      "dayModal"
    )
    .classList.add(
      "hidden"
    );
}

// ----------------------------------

async function saveDayEntry(){

  if(!selectedDate) return;

  const type =
    document.getElementById(
      "entryType"
    ).value;

  const startTime =
    document.getElementById(
      "startTime"
    ).value;

  const endTime =
    document.getElementById(
      "endTime"
    ).value;

  let orderNumber =
    document.getElementById(
      "orderNumber"
    ).value;

  // URL / L4

  if(
    type === "vacation" ||
    type === "sick"
  ){

    orderNumber =
      "Wewnętrzne";
  }

  entries[selectedDate] = {

    type,

    startTime,

    endTime,

    orderNumber
  };

  await saveEntries();

  closeDayModal();

  renderCalendar();

  updateWorkedHours();
}

// ----------------------------------

function updateWorkedHours(){

  let totalMinutes = 0;

  Object.values(entries).forEach(entry => {

    if(
      !entry.startTime ||
      !entry.endTime
    ) return;

    const [sh, sm] =
      entry.startTime
        .split(":")
        .map(Number);

    const [eh, em] =
      entry.endTime
        .split(":")
        .map(Number);

    let start =
      sh * 60 + sm;

    let end =
      eh * 60 + em;

    if(end < start){

      end += 24 * 60;
    }

    totalMinutes +=
      end - start;
  });

  const totalHours =
    (totalMinutes / 60)
      .toFixed(1);

  document.getElementById(
    "workedHours"
  ).innerText =
    totalHours + "h";
}

// ----------------------------------

window.openDayModal =
  openDayModal;

window.closeDayModal =
  closeDayModal;

window.saveDayEntry =
  saveDayEntry;

window.updateWorkedHours =
  updateWorkedHours;