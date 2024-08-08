// pdfGenerator.js

export function generatePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let yOffset = 10;
  const lineHeight = 10;
  const margin = 10;
  const pageHeight = doc.internal.pageSize.height;

  // Function to add text with color
  const addText = (text, x, y, textColor = [0, 0, 0], bgColor = null) => {
    if (bgColor) {
      const textWidth = doc.getTextWidth(text);
      doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
      doc.rect(x - 1, y - 8, textWidth + 2, lineHeight, 'F');
    }
    doc.setTextColor(textColor[0], textColor[1], textColor[2]);
    doc.text(text, x, y);
  };

  const addArrayToPDF = (
    array,
    x,
    y,
    textColor = [0, 0, 0],
    bgColor = null
  ) => {
    array.forEach((item, index) => {
      if (y + lineHeight > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      addText(item.toString(), x, y + index * lineHeight, textColor, bgColor);
    });
  };

  const addSection = (text, x, y, textColor = [0, 0, 0], bgColor = null) => {
    if (y + lineHeight > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    addText(text, x, y, textColor, bgColor);
    y += lineHeight;
    return y;
  };

  // Set colors for different sections
  const headerColor = [0, 0, 255]; // Blue
  const subHeaderColor = [0, 128, 0]; // Green
  const textColor = [0, 0, 0]; // Black
  const headerBgColor = [211, 211, 211]; // Light gray
  const subHeaderBgColor = [255, 255, 224]; // Light yellow

  yOffset = addSection(
    `Total CGPA: ${data.TotalCGPA}`,
    10,
    yOffset,
    headerColor,
    headerBgColor
  );

  for (const semester in data) {
    if (semester === 'TotalCGPA') continue;

    yOffset = addSection(
      semester,
      10,
      yOffset,
      subHeaderColor,
      subHeaderBgColor
    );

    const semesterData = data[semester];

    for (const key in semesterData) {
      if (key === 'computation') {
        const computation = semesterData[key];
        // yOffset = addSection(
        //   'Computation:',
        //   10,
        //   yOffset,
        //   headerColor,
        //   headerBgColor
        // );
        // yOffset = addSection('Grade Point:', 20, yOffset, textColor);
        // addArrayToPDF(computation['Grade Point'], 50, yOffset, textColor);
        // yOffset += lineHeight * computation['Grade Point'].length;
        // yOffset = addSection('Credit load:', 20, yOffset, textColor);
        // addArrayToPDF(computation['Credit load'], 50, yOffset, textColor);
        // yOffset += lineHeight * computation['Credit load'].length;
        yOffset = addSection(
          `Term CGPA: ${computation['Term CGPA']}`,
          20,
          yOffset,
          textColor
        );
      } else {
        yOffset = addSection(
          `${key}: ${semesterData[key]}`,
          10,
          yOffset,
          textColor
        );
      }
    }

    yOffset += lineHeight;
  }

  doc.save('results.pdf');
}

export default { generatePDF };
