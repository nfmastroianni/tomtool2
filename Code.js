// Code for this add-on is in separate files
// secure keys and variables are stored as script properties to keep them out of version control
function getDeveloperKey() {
  let props = PropertiesService.getScriptProperties().getProperties();
  return props.DEVELOPER_KEY;
}
