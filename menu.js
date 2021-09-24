/**
 * Creates a menu entry in the Google Docs UI when the document is opened.
 * This method is only used by the regular add-on, and is never called by
 * the mobile add-on version.
 *
 * @param {object} e The event parameter for a simple onOpen trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode.
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createAddonMenu()
    .addItem("Launch", "showSidebar")
    .addItem("3yo - Data Analysis", "buildAnalysisSheet3")
    .addItem("4yo - Data Analysis", "buildAnalysisSheet4")
    .addToUi();
}
/**
 * Runs when the add-on is installed.
 *
 * @param {object} e The event parameter for a simple onInstall trigger. To
 *     determine which authorization mode (ScriptApp.AuthMode) the trigger is
 *     running in, inspect e.authMode. (In practice, onInstall triggers always
 *     run in AuthMode.FULL, but onOpen triggers may be AuthMode.LIMITED or
 *     AuthMode.NONE).
 */
function onInstall(e) {
  onOpen(e);
}

/**
 * Runs when user clicks the menu item added in onOpen() function above
 *
 */
function showSidebar() {
  var ui =
    HtmlService.createHtmlOutputFromFile("sidebar").setTitle("ToM Tool 2");
  SpreadsheetApp.getUi().showSidebar(ui);
}
