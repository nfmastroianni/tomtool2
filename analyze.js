function createSheet(title, index) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.insertSheet(title, index).getSheetId();
  const ssInfo = {
    ssheet: ss,
    sheet: sheet,
  };
  return ssInfo;
}

function buildAnalysisSheet() {
  let ssInfo = createSheet("analysis", 1);
  const ss = ssInfo.ssheet;
  const sheet = ss.getSheetByName("analysis");
  const valRange = sheet.getRange(1, 2, 1, 5);
  valRange.merge();
  const dataSheet = ss.getSheetByName("studentResults");
  const lastDataRow = dataSheet.getLastRow();
  const headerRow = dataSheet
    .getRange(1, 1, 1, dataSheet.getLastColumn())
    .getValues();
  const isFirstRating = (element) => element.includes("(Language)");
  const firstRatingIndex = headerRow[0].findIndex(isFirstRating);
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let dataHeadersRange = dataSheet.getRange(
    `${alphabet.charAt(firstRatingIndex)}1:AE1`
  );
  let rule = SpreadsheetApp.newDataValidation()
    .requireValueInRange(dataHeadersRange)
    .build();
  valRange
    .setDataValidation(rule)
    .setHorizontalAlignment("center")
    .setFontWeight("bold")
    .setBackground("#033900")
    .setFontColor("white")
    .setFontFamily("Graduate");
  sheet
    .getRange("G1")
    .setFormula(
      '=SUBSTITUTE(ADDRESS(1, MATCH(B1, studentResults!1:1, 0),4),1,"")'
    );

  sheet
    .getRange("A2")
    .setFormula(`=QUERY(studentResults!1:${lastDataRow}, "SELECT "&G1, 1)`);
  newChart(sheet.getRange("A3:A"), sheet);
}

function newChart(range, sheet) {
  let chartBuilder = sheet.newChart();
  chartBuilder
    .addRange(range)
    .setChartType(Charts.ChartType.PIE)
    .setPosition(2, 1, 0, 0)
    .setOption("applyAggregateData", 0)
    .setOption("title", "Tools of the Mind");
  sheet.insertChart(chartBuilder.build());
}

function setUpTrigger() {
  ScriptApp.newTrigger("changeTitle")
    .forSpreadsheet(SpreadsheetApp.getActive())
    .onEdit()
    .create();
}

function onEdit(e) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getActiveSheet();
  let chart = sheet.getCharts()[0];
  let builder = chart.modify();
  builder.setOption("title", e.value);
  builder.setOption("applyAggregateData", 0);
  sheet.updateChart(builder.build());
}
