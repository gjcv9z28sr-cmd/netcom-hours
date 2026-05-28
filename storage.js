const DB_NAME = "NetcomDB";

const DB_VERSION = 1;

let db;

window.entries = {};

window.savedOrders = [];

window.settings = {

  monthlyHours: 175,

  vacationDays: 26,

  hourlyRate: 0,

  delegationPerDay: 45,

  hourBank: 0
};

// ---------------------

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

        if(
          !db.objectStoreNames.contains(
            "entriesStore"
          )
        ){

          db.createObjectStore(
            "entriesStore"
          );
        }

        if(
          !db.objectStoreNames.contains(
            "ordersStore"
          )
        ){

          db.createObjectStore(
            "ordersStore"
          );
        }

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

// ---------------------

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

// ---------------------

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

// ---------------------

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

// ---------------------

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

window.initDatabase =
  initDatabase;

window.saveEntries =
  saveEntries;

window.saveOrders =
  saveOrders;

window.saveToDB =
  saveToDB;

window.loadFromDB =
  loadFromDB;
