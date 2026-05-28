function renderShiftList(){

  const container =
    document.getElementById("shiftList");

  container.innerHTML = "";

  const shifts =
    entries[selectedDate] || [];

  shifts.forEach((shift,index) => {

    const div =
      document.createElement("div");

    div.className = "shift-box";

    div.innerHTML = `

      <b>Zmiana ${index+1}</b><br>

      ${shift.start} - ${shift.end}<br>

      ${shift.hours} h

      <div class="shift-actions">

        <button class="small-btn edit-btn"
          onclick="editShift(${index})">

          ✏️ Edytuj

        </button>

        <button class="small-btn delete-btn"
          onclick="deleteShift(${index})">

          🗑 Usuń

        </button>

      </div>
    `;

    container.appendChild(div);
  });
}

function clearForm(){

  document.getElementById("entryType").value =
    "Praca";

  document.getElementById("startTime").value = "";

  document.getElementById("endTime").value = "";

  document.getElementById("investor").value = "";

  document.getElementById("notes").value = "";

  document.querySelectorAll(".order-input")
    .forEach(input => {
      input.value = "";
    });

  handleTypeChange();
}

function handleTypeChange(){

  const type =
    document.getElementById("entryType").value;

  const workFields =
    document.getElementById("workFields");

  if(type === "Urlop" || type === "L4"){

    document.getElementById("startTime").value =
      "06:00";

    document.getElementById("endTime").value =
      "14:00";

    workFields.style.display = "none";

  } else {

    workFields.style.display = "block";
  }
}

function saveEntry(){

  const type =
    document.getElementById("entryType").value;

  const start =
    document.getElementById("startTime").value;

  const end =
    document.getElementById("endTime").value;

  const investor =
    document.getElementById("investor").value;

  const notes =
    document.getElementById("notes").value;

  const orders = [];

  if(type !== "Urlop" && type !== "L4"){

    document.querySelectorAll(".order-input")
      .forEach(input => {

        if(input.value.trim() !== ""){

          orders.push(input.value.trim());

          if(!savedOrders.includes(input.value.trim())){

            savedOrders.push(input.value.trim());
          }
        }
      });
  }

  saveOrders();

  let hours = 0;

  if(start && end){

    const startDate =
      new Date(`2000-01-01 ${start}`);

    let endDate =
      new Date(`2000-01-01 ${end}`);

    // nocna zmiana
    if(endDate <= startDate){
      endDate.setDate(endDate.getDate()+1);
    }

    hours =
      (endDate - startDate) / 1000 / 60 / 60;

    hours = Number(hours.toFixed(2));
  }

  const newEntry = {
    type,
    start,
    end,
    investor,
    notes,
    orders,
    hours
  };

  if(!entries[selectedDate]){

    entries[selectedDate] = [];
  }

  // EDYCJA
  if(editIndex !== null){

    entries[selectedDate][editIndex] =
      newEntry;

    editIndex = null;

  } else {

    entries[selectedDate].push(newEntry);
  }

  saveEntries();

  renderShiftList();

  clearForm();

  renderCalendar();
}

function editShift(index){

  const shift =
    entries[selectedDate][index];

  editIndex = index;

  document.getElementById("entryType").value =
    shift.type;

  document.getElementById("startTime").value =
    shift.start;

  document.getElementById("endTime").value =
    shift.end;

  document.getElementById("investor").value =
    shift.investor || "";

  document.getElementById("notes").value =
    shift.notes || "";

  document.querySelectorAll(".order-input")
    .forEach((input,i) => {

      input.value =
        shift.orders[i] || "";
    });

  handleTypeChange();
}

function deleteShift(index){

  if(!confirm("Usunąć wpis?")){
    return;
  }

  entries[selectedDate].splice(index,1);

  if(entries[selectedDate].length === 0){

    delete entries[selectedDate];
  }

  saveEntries();

  renderShiftList();

  renderCalendar();
}

function updateSummary(){

  const year =
    currentDate.getFullYear();

  const month =
    currentDate.getMonth();

  let total = 0;

  Object.keys(entries).forEach(date => {

    const entryDate =
      new Date(date);

    if(
      entryDate.getFullYear() === year &&
      entryDate.getMonth() === month
    ){

      entries[date].forEach(entry => {

        total += Number(entry.hours || 0);
      });
    }
  });

  document.getElementById("summaryBox")
    .innerText =
      `Suma godzin: ${total.toFixed(1)} h`;
}

function updateVacationCounter(){

  let used = 0;

  Object.values(entries).forEach(day => {

    day.forEach(entry => {

      if(entry.type === "Urlop"){
        used++;
      }
    });
  });

  const left =
    CONFIG.vacationDays - used;

  document.getElementById("vacationBox")
    .innerText =
      `Pozostało urlopu: ${left} dni`;
}

function showOrders(input){

  const dropdown =
    input.nextElementSibling;

  dropdown.innerHTML = "";

  savedOrders
    .slice()
    .reverse()
    .forEach(order => {

      const div =
        document.createElement("div");

      div.className = "order-item";

      div.innerText = order;

      div.onclick = () => {

        input.value = order;

        dropdown.innerHTML = "";
      };

      dropdown.appendChild(div);
    });
}
window.saveEntry = saveEntry;
window.editShift = editShift;
window.deleteShift = deleteShift;
window.showOrders = showOrders;
window.handleTypeChange = handleTypeChange;