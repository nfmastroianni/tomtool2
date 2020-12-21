function prepareDocument() {
    //check to see if there is only 1 sheet in the spreadsheet
    var ss = SpreadsheetApp.getActive();
    var sheets = ss.getSheets();
    if (sheets.length == 1) {
        var dataSheet = sheets[0];
        dataSheet.setName('studentResults');
        var colAarray = dataSheet.getRange("A1:A8").getValues();
        var colAvalues = colAarray.reduce(function(prev,curr) {
            return prev.concat(curr);
        });
        var headerIndex = colAvalues.indexOf("#");
        if(headerIndex > 1) {
            dataSheet.deleteRows(1,headerIndex);
        }
        dataSheet.getRange("A1:AF").setNumberFormat("@").setHorizontalAlignment("center");
    }
}