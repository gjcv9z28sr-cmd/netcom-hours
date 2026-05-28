function processExcelEntry(date, entry, rows){

  if(!entry){
    return;
  }

  const start =
    entry.start || "";

  const end =
    entry.end || "";

  // BRAK GODZIN

  if(!start || !end){

    rows.push({

      Data: date,

      Typ: entry.type || "",

      Start: "",

      Koniec: "",

      Godziny: "",

      Zlecenie:
        (entry.orders || []).join(", "),

      Inwestor:
        entry.investor || ""
    });

    return;
  }

  // NOCNA ZMIANA

  const isNight =
    end < start;

  if(!isNight){

    addSplitOrders(
      rows,
      date,
      entry,
      start,
      end
    );

    return;
  }

  // DZIEŃ NASTĘPNY

  const nextDate =
    getNextDate(date);

  // CZĘŚĆ 1

  addSplitOrders(
    rows,
    date,
    entry,
    start,
    "23:59"
  );

  // CZĘŚĆ 2

  addSplitOrders(
    rows,
    nextDate,
    entry,
    "00:00",
    end
  );
}

function addSplitOrders(
  rows,
  date,
  entry,
  start,
  end
){

  const orders =
    entry.orders || [];

  // BRAK ZLECEŃ

  if(orders.length === 0){

    rows.push({

      Data: date,

      Typ: entry.type || "",

      Start: start,

      Koniec: end,

      Godziny:
        calculateHours(start,end),

      Zlecenie: "",

      Inwestor:
        entry.investor || ""
    });

    return;
  }

  // PODZIAŁ GODZIN

  const split =
    splitWorkHours(
      start,
      end,
      orders.length
    );

  orders.forEach((order,index) => {

    rows.push({

      Data: date,

      Typ: entry.type || "",

      Start:
        split[index].start,

      Koniec:
        split[index].end,

      Godziny:
        split[index].hours,

      Zlecenie: order,

      Inwestor:
        entry.investor || ""
    });
  });
}

function splitWorkHours(
  start,
  end,
  count
){

  const result = [];

  let startDate =
    new Date(`2000-01-01 ${start}`);

  let endDate =
    new Date(`2000-01-01 ${end}`);

  // NOCNA

  if(endDate <= startDate){

    endDate.setDate(
      endDate.getDate() + 1
    );
  }

  const totalMs =
    endDate - startDate;

  const partMs =
    totalMs / count;

  for(let i=0; i<count; i++){

    const partStart =
      new Date(
        startDate.getTime() +
        partMs * i
      );

    const partEnd =
      new Date(
        startDate.getTime() +
        partMs * (i + 1)
      );

    result.push({

      start:
        formatHour(partStart),

      end:
        formatHour(partEnd),

      hours:
        (
          partMs / 1000 / 60 / 60
        ).toFixed(2)
    });
  }

  return result;
}

function calculateHours(
  start,
  end
){

  let startDate =
    new Date(`2000-01-01 ${start}`);

  let endDate =
    new Date(`2000-01-01 ${end}`);

  // NOCNA

  if(endDate <= startDate){

    endDate.setDate(
      endDate.getDate() + 1
    );
  }

  return (
    (
      endDate - startDate
    ) / 1000 / 60 / 60
  ).toFixed(2);
}

function formatHour(date){

  let h =
    date.getHours();

  let m =
    date.getMinutes();

  h = String(h)
    .padStart(2,"0");

  m = String(m)
    .padStart(2,"0");

  return `${h}:${m}`;
}

function getNextDate(date){

  const d =
    new Date(date);

  d.setDate(
    d.getDate() + 1
  );

  return d
    .toISOString()
    .split("T")[0];
}