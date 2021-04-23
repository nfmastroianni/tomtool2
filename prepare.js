/**
 * This function is run manually as the user clicks a button.
 * It removes rows above the data headers
 */
function prepareDocument() {
  //check to see if there is only 1 sheet in the spreadsheet
  var ss = SpreadsheetApp.getActive();
  var sheets = ss.getSheets();
  if (sheets.length == 1) {
    var dataSheet = sheets[0];
    dataSheet.setName("studentResults");
    var colAarray = dataSheet.getRange("A1:A8").getValues();
    var colAvalues = colAarray.reduce(function (prev, curr) {
      return prev.concat(curr);
    });
    var headerIndex = colAvalues.indexOf("#");
    if (headerIndex > 1) {
      dataSheet.deleteRows(1, headerIndex);
    }

    const headerRange = dataSheet.getRange(1, 1, 1, dataSheet.getLastColumn());
    const headerValues = headerRange.getValues().reduce((prev, next) => {
      return prev.concat(next);
    });
    const originalHeaders = headerValues.map((header) => {
      if (header.indexOf(")") < 0) {
        return header;
      } else {
        return header.substr(0, header.indexOf(")") + 1);
      }
    });
    let row1 = [];
    row1.push(originalHeaders);
    headerRange.setValues(row1);

    dataSheet
      .getRange("A1:AF")
      .setNumberFormat("@")
      .setHorizontalAlignment("center");
    return true;
  } else {
    return false;
  }
}
