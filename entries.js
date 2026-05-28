let selectedDate = null;

// ----------------------------------------

function getEntryColor(type){

  switch(type){

    case "delegation":
      return "#ff9800";

    case "vacation":
      return "#4caf50";

    case "sick":
      return "#f44336";

    default:
      return "#2196f3";
  }
}

// ----------------------------------------

function openDayModal(dateKey){

  selectedDate = dateKey;

  const modal =
    document.getElementById(
      "dayModal"
    );

  modal.classList.remove(
    "hidden"
  );

  document.getElementById(
    "modalDate"
  ).innerText =
    dateKey;

  const entry =
    entries[dateKey];

  if(entry){

    document.getElementById(
      "entryType"
    ).value =
      entry.type || "work";

    document.getElementById(
      "startTime"
    ).value =
      entry.startTime || "";

    document.getElementById(
      "endTime"
    ).value =
      entry.endTime || "";

    document.getElementById(
      "order1"
    ).value =
      entry.orders?.[0] || "";

    document.getElementById(
      "order2"
    ).value =
      entry.orders?.[1] || "";

    document.getElementById(
      "order3"
    ).value =
      entry.orders?.[2] || "";

    document.getElementById(
      "notes"
    ).value =
      entry.notes || "";

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
      "order1"
    ).value =
      "";

    document.getElementById(
      "order2"
    ).value =
      "";

    document.getElementById(
      "order3"
    ).value =
      "";

    document.getElementById(
      "notes"
    ).value =
      "";
  }

  toggleOrderInputs();
}

// ----------------------------------------

function closeDayModal(){

  document
    .getElementById(
      "dayModal"
    )
    .classList.add(
      "hidden"
    );
}

// ----------------------------------------

function toggleOrderInputs(){

  const type =
    document.getElementById(
      "entryType"
    ).value;

  const ordersSection =
    document.getElementById(
      "ordersSection"
    );

  if(
    type === "vacation" ||
    type === "sick"
  ){

    ordersSection.style.display =
      "none";

  }else{

    ordersSection.style.display =
      "block";
  }

  // AUTO 8H

  if(type === "vacation"){

    document.getElementById(
      "startTime"
    ).value =
      "06:00";

    document.getElementById(
      "endTime"
    ).value =
      "14:00";
  }

  if(type === "sick"){

    document.getElementById(
      "startTime"
    ).value =
      "06:00";

    document.getElementById(
      "endTime"
    ).value =
      "14:00";
  }
}

// ----------------------------------------

async function saveDayEntry(){

  if(!selectedDate) return;

  const type =
    document.getElementById(
      "entryType"
    ).value;

  const orders = [

    document.getElementById(
      "order1"
    ).value,

    document.getElementById(
      "order2"
    ).value,

    document.getElementById(
      "order3"
    ).value

  ].filter(Boolean);

  entries[selectedDate] = {

    type,

    startTime:
      document.getElementById(
        "startTime"
      ).value,

    endTime:
      document.getElementById(
        "endTime"
      ).value,

    orders,

    notes:
      document.getElementById(
        "notes"
      ).value,

    color:
      getEntryColor(type)
  };

  await saveEntries();

  closeDayModal();

  renderCalendar();

  updateWorkedHours();
}

// ----------------------------------------

async function deleteDayEntry(){

  if(!selectedDate) return;

  delete entries[selectedDate];

  await saveEntries();

  closeDayModal();

  renderCalendar();

  updateWorkedHours();
}

// ----------------------------------------

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

  document.getElementById(
    "workedHours"
  ).innerText =
    (totalMinutes / 60).toFixed(1)
    + "h";
}

// ----------------------------------------

window.openDayModal =
  openDayModal;

window.closeDayModal =
  closeDayModal;

window.saveDayEntry =
  saveDayEntry;

window.deleteDayEntry =
  deleteDayEntry;

window.updateWorkedHours =
  updateWorkedHours;

window.toggleOrderInputs =
  toggleOrderInputs;