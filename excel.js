async function generateExcel(){

  const workbook =
    new ExcelJS.Workbook();

  const worksheet =
    workbook.addWorksheet(
      "NCS KW WAW 2024"
    );

  // KOLUMNY

  worksheet.columns = [

    { header:"Data", key:"data", width:22 },

    { header:"Miesiąc", key:"miesiac", width:10 },

    { header:"Rok", key:"rok", width:10 },

    {
      header:"Dzień tygodnia",
      key:"dzien",
      width:18
    },

    { header:"KW", key:"kw", width:8 },

    {
      header:"Pracownik",
      key:"pracownik",
      width:24
    },

    {
      header:"Godziny pracy",
      key:"godzinyPracy",
      width:18
    },

    {
      header:"Ile godzin",
      key:"ileGodzin",
      width:12
    },

    {
      header:"Kierownik",
      key:"kierownik",
      width:24
    },

    {
      header:"Inwestor",
      key:"inwestor",
      width:18
    },

    {
      header:"Budowa",
      key:"budowa",
      width:18
    },

    {
      header:"Zlecenie",
      key:"zlecenie",
      width:18
    },

    {
      header:"Rodzaj pracy",
      key:"rodzaj",
      width:18
    },

    {
      header:"BRYGADZISTA",
      key:"brygadzista",
      width:24
    },

    {
      header:"Zatrudnienie pracownika",
      key:"zatrudnienie",
      width:24
    }
  ];

  // DANE

  Object.keys(entries).forEach(date => {

    const dayEntries =
      entries[date] || [];

    dayEntries.forEach(entry => {

      const d =
        new Date(date);

      let rodzaj =
        "Budowa";

      if(entry.type === "Urlop"){

        rodzaj = "Urlop";
      }

      if(entry.type === "L4"){

        rodzaj = "Chorobowe";
      }

      let zatrudnienie =
        "Lokalnie";

      if(entry.type === "Delegacja"){

        zatrudnienie =
          "Delegacja";
      }

      let zlecenie =
        (entry.orders || [])[0] || "";

      if(
        entry.type === "Urlop" ||
        entry.type === "L4"
      ){

        zlecenie =
          "Wewnętrzne";
      }

      worksheet.addRow({

        data:
          formatDatePL(d),

        miesiac:
          d.getMonth()+1,

        rok:
          d.getFullYear(),

        dzien:
          getWeekDay(d),

        kw:
          getWeekNumber(d),

        pracownik:
          CONFIG.employee,

        godzinyPracy:
          `${entry.start || ""}-${entry.end || ""}`,

        ileGodzin:
          entry.hours || "",

        kierownik:
          CONFIG.manager,

        inwestor:
          entry.investor || "",

        budowa:
          CONFIG.defaultSite,

        zlecenie:
          zlecenie,

        rodzaj:
          rodzaj,

        brygadzista:
          CONFIG.foreman,

        zatrudnienie:
          zatrudnienie
      });
    });
  });

  // HEADER

  const headerRow =
    worksheet.getRow(1);

  headerRow.height = 32;

  headerRow.eachCell((cell,index) => {

    let bg =
      CONFIG.excel.headerBlue;

    if(index === 5){

      bg =
        CONFIG.excel.kwBlue;
    }

    cell.fill = {

      type:"pattern",

      pattern:"solid",

      fgColor:{ argb:bg }
    };

    cell.font = {

      bold:true,

      color:{ argb:"FFFFFF" },

      size:12,

      name:"Calibri"
    };

    cell.alignment = {

      vertical:"middle",

      horizontal:"center",

      wrapText:true
    };

    cell.border = {

      top:{
        style:"thin",
        color:{
          argb:
            CONFIG.excel.border
        }
      },

      left:{
        style:"thin",
        color:{
          argb:
            CONFIG.excel.border
        }
      },

      bottom:{
        style:"thin",
        color:{
          argb:
            CONFIG.excel.border
        }
      },

      right:{
        style:"thin",
        color:{
          argb:
            CONFIG.excel.border
        }
      }
    };
  });

  // WIERSZE

  worksheet.eachRow((row,rowNumber) => {

    if(rowNumber === 1){
      return;
    }

    const fillColor =
      rowNumber % 2 === 0
      ? CONFIG.excel.lightBlue
      : CONFIG.excel.whiteRow;

    row.eachCell(cell => {

      cell.fill = {

        type:"pattern",

        pattern:"solid",

        fgColor:{
          argb:fillColor
        }
      };

      cell.font = {

        size:11,

        name:"Calibri"
      };

      cell.border = {

        top:{
          style:"thin",
          color:{
            argb:
              CONFIG.excel.border
          }
        },

        left:{
          style:"thin",
          color:{
            argb:
              CONFIG.excel.border
          }
        },

        bottom:{
          style:"thin",
          color:{
            argb:
              CONFIG.excel.border
          }
        },

        right:{
          style:"thin",
          color:{
            argb:
              CONFIG.excel.border
          }
        }
      };

      cell.alignment = {

        vertical:"middle",

        horizontal:"center"
      };
    });
  });

  // FILTER

  worksheet.autoFilter = {

    from:"A1",

    to:"O1"
  };

  // FREEZE

  worksheet.views = [
    {
      state:"frozen",
      ySplit:1
    }
  ];

  // EXPORT

  const buffer =
    await workbook.xlsx.writeBuffer();

  const blob =
    new Blob(
      [buffer],
      {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      }
    );

  const link =
    document.createElement("a");

  link.href =
    URL.createObjectURL(blob);

  link.download =
    "NCS_KW_WAW_2024.xlsx";

  link.click();
}

window.generateExcel =
  generateExcel;

// ------------------------

function getWeekDay(date){

  const days = [
    7,1,2,3,4,5,6
  ];

  return days[
    date.getDay()
  ];
}

function getWeekNumber(date){

  const d =
    new Date(
      Date.UTC(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      )
    );

  d.setUTCDate(
    d.getUTCDate() +
    4 -
    (d.getUTCDay() || 7)
  );

  const yearStart =
    new Date(
      Date.UTC(
        d.getUTCFullYear(),
        0,
        1
      )
    );

  return Math.ceil(
    (
      (
        (
          d - yearStart
        ) / 86400000
      ) + 1
    ) / 7
  );
}

function formatDatePL(date){

  return date.toLocaleDateString(
    "pl-PL",
    {

      weekday:"short",

      day:"numeric",

      month:"short",

      year:"numeric"
    }
  );
}