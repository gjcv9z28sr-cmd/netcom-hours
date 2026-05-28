window.addEventListener(

  "DOMContentLoaded",

  async () => {

    try{

      console.log(
        "START APP"
      );

      await initDatabase();

      console.log(
        "DB READY"
      );

      if(
        typeof loadSettings ===
        "function"
      ){

        await loadSettings();
      }

      console.log(
        "SETTINGS READY"
      );

      if(
        typeof renderCalendar ===
        "function"
      ){

        renderCalendar();
      }

      console.log(
        "CALENDAR READY"
      );

    }catch(error){

      console.error(
        "APP ERROR:",
        error
      );

      alert(
        "Błąd aplikacji: " +
        error.message
      );
    }
  }
);
