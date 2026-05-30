// Updated pdf.js
async function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

  let y = 10; // Starting Y-coordinate for PDF content

  doc.text("Raport godzin", 105, y, { align: "center" });
  y += 10;

  Object.keys(entries).forEach(date => {
    const entry = entries[date];

    doc.text(`Data: ${date}`, 10, y);
    doc.text(`Rodzaj: ${entry.type}`, 60, y);
    doc.text(`Godziny: ${entry.startTime || "--"} - ${entry.endTime || "--"}`, 110, y);
    doc.text(`Zlecenie: ${entry.orders?.[0] || "Brak"}`, 160, y);

    y += 10;

    if (y > 280) {
      doc.addPage();
      y = 10; // Reset Y for new page
    }
  });

  doc.save("Raport.pdf");
}

window.generatePDF = generatePDF;
