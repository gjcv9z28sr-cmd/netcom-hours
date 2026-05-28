const DB_NAME =
  "NetcomDB";

const DB_VERSION = 1;

let db;

// --------------------
// GLOBALS
// --------------------

window.entries = {};

window.savedOrders = [];

window.settings = {

  monthlyHours: 175,

  vacationDays: 26,

  hourlyRate: 0,

  delegationPerDay: 45,

  hourBank: 0
};

// --------------------
// INIT DB
// --------------------

async function initDatabase(){

  return new Promise((resolve,reject) => {

    const request =
      indexedDB.open(
        DB_NAME,
        DB_VERSION
      );

    request.onupgradeneeded =
      function(event){

        db =
          event.target.result;

        // ENTRIES

        if(
          !db.objectStoreNames.contains(
            "entriesStore"
          )
        ){

          db.createObjectStore(
            "entriesStore"
          );
        }

        // ORDERS

        if(
          !db.objectStoreNames.contains(
            "ordersStore"
          )
        ){

          db.createObjectStore(
            "ordersStore"
          );
        }

        // SETTINGS

        if(
          !db.objectStoreNames.contains(
            "settingsStore"
          )
        ){

          db.createObjectStore(
            "settingsStore"
          );
        }
      };

    request.onsuccess =
      async function(event){

        db =
          event.target.result;

        await loadEntries();

        await loadOrders();

        await loadSettings();

        resolve();
      };

    request.onerror =
      function(){

        reject(
          "Błąd IndexedDB"
        );
      };
  });
}

// --------------------
// SAVE TO DB
// --------------------

function saveToDB(
  storeName,
  key,
  data
){

  return new Promise((resolve,reject) => {

    const transaction =
      db.transaction(
        [storeName],
        "readwrite"
      );

    const store =
      transaction.objectStore(
        storeName
      );

    const request =
      store.put(
        data,
        key
      );

    request.onsuccess =
      () => resolve();

    request.onerror =
      () => reject();
  });
}

// --------------------
// LOAD FROM DB
// --------------------

function loadFromDB(
  storeName,
  key
){

  return new Promise((resolve,reject) => {

    const transaction =
      db.transaction(
        [storeName],
        "readonly"
      );

    const store =
      transaction.objectStore(
        storeName
      );

    const request =
      store.get(key);

    request.onsuccess =
      () => resolve(
        request.result
      );

    request.onerror =
      () => reject();
  });
}

// --------------------
// ENTRIES
// --------------------

async function saveEntries(){

  await saveToDB(
    "entriesStore",
    "entries",
    entries
  );
}

async function loadEntries(){

  const data =
    await loadFromDB(
      "entriesStore",
      "entries"
    );

  window.entries =
    data || {};
}

// --------------------
// ORDERS
// --------------------

async function saveOrders(){

  await saveToDB(
    "ordersStore",
    "orders",
    savedOrders
  );
}

async function loadOrders(){

  const data =
    await loadFromDB(
      "ordersStore",
      "orders"
    );

  window.savedOrders =
    data || [];
}

// --------------------
// SETTINGS
// --------------------

async function saveSettingsToDB(){

  await saveToDB(
    "settingsStore",
    "settings",
    settings
  );
}

async function loadSettings(){

  const data =
    await loadFromDB(
      "settingsStore",
      "settings"
    );

  if(data){

    window.settings =
      data;
  }
}

window.initDatabase =
  initDatabase;

window.saveEntries =
  saveEntries;

window.saveOrders =
  saveOrders;

window.saveSettingsToDB =
  saveSettingsToDB;