window.addEventListener(

  "DOMContentLoaded",

  async () => {

    try{

      await initDatabase();

      await loadSettings();

      renderCalendar();

    }catch(error){

      console.error(error);

      alert(
        "Błąd aplikacji"
      );
    }
  }
);