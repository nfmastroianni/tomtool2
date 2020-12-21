// Code for this add-on is in separate files
function getDeveloperKey() {
  let props = PropertiesService.getScriptProperties().getProperties();
  Logger.log(props);
  return props.DEVELOPER_KEY;
}
