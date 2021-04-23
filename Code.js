// Code for this add-on is in separate files
// secure keys and variables are stored as script properties to keep them out of version control

/**
 *
 * @returns {string} gets developer key stored as string in script property
 */
function getDeveloperKey() {
  let props = PropertiesService.getScriptProperties().getProperties();
  return props.DEVELOPER_KEY;
}
/**
 *
 * @returns {string} the id for the current spreadsheet
 */
function getId() {
  return SpreadsheetApp.getActive().getId();
}
