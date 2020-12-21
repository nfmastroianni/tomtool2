function resetSidebar() {
    var ss = SpreadsheetApp.getActive();
    var sheets = ss.getSheets();
    if(sheets.length > 1) {
        for (i=1; i<sheets.length; i++) {
            ss.deleteSheet(sheets[i]);
        }
        var ui = HtmlService.createHtmlOutputFromFile('sidebar')
        .setTitle('ToM Tool 2');
        SpreadsheetApp.getUi().showSidebar(ui);
    }
}
