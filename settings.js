window.settings = {

  monthlyHours: 175,

  vacationDays: 26,

  hourlyRate: 0,

  delegationPerDay: 45,

  hourBank: 0
};

// ------------------------

async function loadSettings(){

  const saved =
    await loadFromDB(
      "settingsStore",
      "settings"
    );

  if(saved){

    window.settings = saved;
  }

  updateDashboard();
}

// ------------------------

async function saveSettings(){

  settings.monthlyHours =
    Number(
      document.getElementById(
        "settingsMonthlyHours"
      ).value
    );

  settings.vacationDays =
    Number(
      document.getElementById(
        "settingsVacationDays"
      ).value
    );

  settings.hourlyRate =
    Number(
      document.getElementById(
        "settingsHourlyRate"
      ).value
    );

  settings.delegationPerDay =
    Number(
      document.getElementById(
        "settingsDelegationPerDay"
      ).value
    );

  settings.hourBank =
    Number(
      document.getElementById(
        "settingsHourBank"
      ).value
    );

  await saveToDB(
    "settingsStore",
    "settings",
    settings
  );

  updateDashboard();

  closeSettingsModal();
}

// ------------------------

function openSettingsModal(){

  document
    .getElementById(
      "settingsModal"
    )
    .classList.remove(
      "hidden"
    );

  document.getElementById(
    "settingsMonthlyHours"
  ).value =
    settings.monthlyHours;

  document.getElementById(
    "settingsVacationDays"
  ).value =
    settings.vacationDays;

  document.getElementById(
    "settingsHourlyRate"
  ).value =
    settings.hourlyRate;

  document.getElementById(
    "settingsDelegationPerDay"
  ).value =
    settings.delegationPerDay;

  document.getElementById(
    "settingsHourBank"
  ).value =
    settings.hourBank;
}

// ------------------------

function closeSettingsModal(){

  document
    .getElementById(
      "settingsModal"
    )
    .classList.add(
      "hidden"
    );
}

// ------------------------

function updateDashboard(){

  document.getElementById(
    "monthlyHours"
  ).innerText =
    settings.monthlyHours + "h";

  document.getElementById(
    "hourBank"
  ).innerText =
    settings.hourBank + "h";

  document.getElementById(
    "vacationLeft"
  ).innerText =
    settings.vacationDays +
    " dni";
}

window.openSettingsModal =
  openSettingsModal;

window.closeSettingsModal =
  closeSettingsModal;

window.saveSettings =
  saveSettings;

window.loadSettings =
  loadSettings;

window.updateDashboard =
  updateDashboard;