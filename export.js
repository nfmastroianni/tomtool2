/**
 * Displays an HTML-service dialog in Google Sheets that contains client-side
 * JavaScript code for the Google Picker API.
 */
function showPicker() {
  var html = HtmlService.createHtmlOutputFromFile("Picker.html")
    .setWidth(900)
    .setHeight(500)
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  SpreadsheetApp.getUi().showModalDialog(
    html,
    "Select a folder to hold your reports"
  );
}

/**
 * Gets the user's OAuth 2.0 access token so that it can be passed to Picker.
 * This technique keeps Picker from needing to show its own authorization
 * dialog, but is only possible if the OAuth scope that Picker needs is
 * available in Apps Script. In this case, the function includes an unused call
 * to a DriveApp method to ensure that Apps Script requests access to all files
 * in the user's Drive.
 *
 * @return {string} The user's OAuth 2.0 access token.
 */
function getOAuthToken() {
  DriveApp.getRootFolder();
  Logger.log(ScriptApp.getOAuthToken());
  return ScriptApp.getOAuthToken();
}
/**
 * Gets the sheets in the spreadsheet and creates separate files in the folder
 * selected by the user in the Google Picker
 *
 * @param {string} ID of folder in which to place the separate PDFs
 */
function exportSeparateSheets(id) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var url = ss.getUrl();
  var sheets = ss.getSheets();
  var token = ScriptApp.getOAuthToken();
  for (var i = 1; i < sheets.length; i++) {
    ss.setActiveSheet(sheets[i]);
    let blob = _getAsBlob(url, sheets[i], token);
    var fileName = sheets[i].getName();
    blob = blob.setName(fileName);
    var folder = DriveApp.getFolderById(id);
    folder.createFile(blob);
  }
}
/**
 * Run on a loop to generate a PDF version of each sheet
 * @param {string} url
 * @param {object} sheet
 * @param {string} token
 */
function _getAsBlob(url, sheet, token) {
  var sheetParam = "";

  if (sheet) {
    sheetParam = "&gid=" + sheet.getSheetId();
  }
  var exportUrl =
    url.replace(/\/edit.*$/, "") +
    "/export?exportFormat=pdf&format=pdf" +
    "&size=LETTER" +
    "&portrait=true" +
    "&fitw=true" +
    "&top_margin=0.75" +
    "&bottom_margin=0.75" +
    "&left_margin=0.7" +
    "&right_margin=0.7" +
    "&sheetnames=true&printtitle=false" +
    "&pagenum=false" +
    "&gridlines=false" +
    "&fzr=FALSE" +
    sheetParam;
  Utilities.sleep(6000);
  var response = UrlFetchApp.fetch(exportUrl, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response.getBlob();
}
