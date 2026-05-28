async function generatePDF() {

  console.log("PDF ENTRIES:", entries);

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4"
  });

  // =====================================
  // KOLORY
  // =====================================

  const COLORS = {

    blue:
      [0, 92, 197],

    lightBlue:
      [240, 245, 255],

    black:
      [20, 20, 20],

    gray:
      [120, 120, 120]
  };

  // =====================================
  // DATA
  // =====================================

  const MONTHS = [
    "STYCZEN",
    "LUTY",
    "MARZEC",
    "KWIECIEN",
    "MAJ",
    "CZERWIEC",
    "LIPIEC",
    "SIERPIEN",
    "WRZESIEN",
    "PAZDZIERNIK",
    "LISTOPAD",
    "GRUDZIEN"
  ];

  const now = new Date();

  const month =
    MONTHS[now.getMonth()];

  const year =
    now.getFullYear();

  // =====================================
  // TŁO
  // =====================================

  doc.setFillColor(
    255,
    255,
    255
  );

  doc.rect(
    0,
    0,
    210,
    297,
    "F"
  );

  // =====================================
  // LOGO
  // =====================================

  try {

    doc.addImage(
      logoBase64,
      "PNG",
      128,
      10,
      65,
      22
    );

  } catch(e) {

    console.log("Logo error");
  }

  // =====================================
  // PODWÓJNA LINIA
  // =====================================

  doc.setDrawColor(
    0,
    0,
    0
  );

  doc.setLineWidth(0.4);

  doc.line(
    10,
    38,
    200,
    38
  );

  doc.line(
    10,
    40,
    200,
    40
  );

  // =====================================
  // HEADER
  // =====================================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(9);

  doc.setTextColor(
    ...COLORS.black
  );

  doc.text(
    `REJESTR CZASU PRACY PAWEL CICHOCKI ${month} ${year}`,
    105,
    48,
    {
      align: "center"
    }
  );

  // =====================================
  // NIEBIESKI BOX
  // =====================================

  doc.setFillColor(
    ...COLORS.blue
  );

  doc.roundedRect(
    15,
    62,
    180,
    34,
    5,
    5,
    "F"
  );

  // LINIA W BOXIE

  doc.setDrawColor(
    255,
    255,
    255
  );

  doc.line(
    70,
    79,
    140,
    79
  );

  // TEKST BOX

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(18);

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.text(
    "MIESIECZNE ZESTAWIENIE GODZIN",
    105,
    74,
    {
      align: "center"
    }
  );

  doc.setFontSize(16);

  doc.text(
    `${month} ${year}`,
    105,
    89,
    {
      align: "center"
    }
  );

  // =====================================
  // SUMA GODZIN
  // =====================================

  let totalHours = 0;

  Object.keys(entries).forEach(date => {

    entries[date].forEach(entry => {

      totalHours +=
        parseFloat(entry.hours) || 0;
    });
  });

  // =====================================
  // PODSUMOWANIE
  // =====================================

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(11);

  doc.setTextColor(
    ...COLORS.black
  );

  doc.text(
    "Pracownik:",
    20,
    115
  );

  doc.text(
    "Suma godzin:",
    20,
    128
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.text(
    "Pawel Cichocki",
    55,
    115
  );

  doc.text(
    `${totalHours}h`,
    55,
    128
  );

  // =====================================
  // TABELA
  // =====================================

  let y = 148;

  // HEADER

  doc.setFillColor(
    ...COLORS.blue
  );

  doc.rect(
    10,
    y,
    190,
    11,
    "F"
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(7);

  doc.setTextColor(
    255,
    255,
    255
  );

  doc.text("DATA", 13, y + 7);

  doc.text(
    "CZAS PRACY",
    42,
    y + 7
  );

  doc.text(
    "GODZINY",
    88,
    y + 7
  );

  doc.text(
    "ZLECENIE",
    112,
    y + 7
  );

  doc.text(
    "INWESTOR",
    148,
    y + 7
  );

  doc.text(
    "UWAGI",
    178,
    y + 7
  );

  y += 11;

  // =====================================
  // WIERSZE
  // =====================================

  let rowIndex = 0;

  Object.keys(entries).forEach(date => {

    const dayEntries =
      entries[date] || [];

    dayEntries.forEach(entry => {

      if(rowIndex % 2 === 0){

        doc.setFillColor(
          ...COLORS.lightBlue
        );

      } else {

        doc.setFillColor(
          255,
          255,
          255
        );
      }

      // row bg

      doc.rect(
        10,
        y,
        190,
        10,
        "F"
      );

      // border

      doc.setDrawColor(
        220,
        220,
        220
      );

      doc.rect(
        10,
        y,
        190,
        10
      );

      // text

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(7);

      doc.setTextColor(
        ...COLORS.black
      );

      doc.text(
        String(date),
        13,
        y + 6
      );

      doc.text(
        `${entry.start || "--"}-${entry.end || "--"}`,
        42,
        y + 6
      );

      doc.text(
        `${entry.hours || 0}h`,
        90,
        y + 6
      );

      doc.text(
        String(
          entry.order1 || "-"
        ).substring(0, 18),
        112,
        y + 6
      );

      doc.text(
        String(
          entry.investor || "-"
        ).substring(0, 12),
        148,
        y + 6
      );

      doc.text(
        String(
          entry.notes || "-"
        ).substring(0, 16),
        178,
        y + 6
      );

      y += 10;

      rowIndex++;
    });
  });

  // =====================================
  // DOLNA LINIA
  // =====================================

  doc.setDrawColor(
    0,
    0,
    0
  );

  doc.setLineWidth(0.4);

  doc.line(
    10,
    280,
    200,
    280
  );

  doc.line(
    10,
    282,
    200,
    282
  );

  // =====================================
  // STOPKA
  // =====================================

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(8);

  doc.setTextColor(
    ...COLORS.gray
  );

  doc.text(
    "NETCOM SYSTEM Sp. z o.o.",
    105,
    288,
    {
      align: "center"
    }
  );

  // =====================================
  // SAVE
  // =====================================

  const fileName =
    `RAPORT-GODZIN_PAWEL-CICHOCKI_${month}_${year}.pdf`;

  doc.save(fileName);
}

window.generatePDF =
  generatePDF;