function createSheet(title, index) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.insertSheet(title, index).getSheetId();
  const ssInfo = {
    ssheet: ss,
    sheet: sheet,
  };
  return ssInfo;
}

/**
 * Takes a positive integer and returns the corresponding column name.
 * @param {number} num  The positive integer to convert to a column name.
 * @return {string}  The column name.
 */
function toColumnName(num) {
  for (var ret = "", a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
  }
  return ret;
}

function buildAnalysisSheet() {
  let ssInfo = createSheet("analysis", 1);
  const ss = ssInfo.ssheet;
  let sheets = ss.getSheets();
  let sheetNames = sheets.map((sheet) => sheet.getName()); // to add ability to overwrite the analysis sheet in future version.

  const sheet = ss.getSheetByName("analysis");
  const valRange = sheet.getRange(1, 2, 1, 5);
  valRange.merge();
  const dataSheet = ss.getSheetByName("studentResults");
  const lastDataColumn = dataSheet.getLastColumn();
  const lastDataRow = dataSheet.getLastRow();
  const headerRow = dataSheet
    .getRange(1, 1, 1, dataSheet.getLastColumn())
    .getValues();
  const isFirstRating = (element) => element.includes("(Language)");
  const firstRatingIndex = headerRow[0].findIndex(isFirstRating);

  let dataHeadersRange = dataSheet.getRange(
    `${toColumnName(firstRatingIndex + 1)}1:${toColumnName(lastDataColumn)}1`
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
