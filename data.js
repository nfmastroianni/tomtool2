function _readData(sheetObject, id, properties, filters) {
    if (typeof properties == "undefined" && filters) {
        properties = _getHeaderRow(sheetObject, filters);
        if(properties) { 
            properties = properties.map(function (p) {
            return p.replace(/\s+/g, '_');
          });
        } else {
          Logger.log("problems getting header rows");
        }
    } else if (typeof properties == "undefined"){
      properties = _getHeaderRow(sheetObject);
        if(properties) { 
            properties = properties.map(function (p) {
            return p.replace(/\s+/g, '_');
          });
        } else {
          Logger.log("problems getting header rows");
        }
    }
    if (properties) {
      var rows = _getDataRows(sheetObject),
      data = [];
      if(filters) {
        var filterKeys = Object.keys(filters);
        var filterValues = Object.values(filters);
        var filterIndexes = [];
        for (var k = 0; k < filterKeys.length; k++) {
          filterIndexes.push(properties.indexOf(filterKeys[k]));
        }
        for (var r = 0, l = rows.length; r < l; r++) {
          var row = rows[r],
              record = {};
          for (var p in properties) {
              record[properties[p]] = row[p];
          }
          var recordValues = Object.values(record);
          if(checkDataFilters(filterValues, recordValues, filterIndexes)) {
              data.push(record);
          } else {
            //Error
          }
        }
      } else {
        for (var r = 0, l = rows.length; r < l; r++) {
          var row = rows[r],
              record = {};
          for (var p in properties) {
              record[properties[p]] = row[p];
          }
          data.push(record);
        }
      }
    }
    return data;
  }
  
  function _getDataRows(sheetObject) {
    var sh = sheetObject;
    var lastRow = sh.getLastRow();
    var lastCol = sh.getLastColumn();
    if(lastRow > 1) {
      return sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
    } else {
      return sh.getRange(2,1,1, lastCol).getValues();
    }
    
  }
  
  function _getHeaderRow(sheetObject, filters) {
    var sh = sheetObject;
    var headerArray = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    if (filters) {
      var filterArray = Object.keys(filters);
      if(checkFilters(filterArray, headerArray)){
        return headerArray;
      } else {
        Logger.log("problem getting header row");
        return false;
      }
    } else {
      return headerArray;
    }  
  }
  
  function checkFilters(filterArray, headerArray) {
    return filterArray.every(i => headerArray.includes(i));
  }
  
  function checkDataFilters(filterValues, recordValues, filterIndexes) {
    let results = [];
    for (i=0; i<filterIndexes.length; i++) {
      results.push(recordValues[filterIndexes[i]].toString() == filterValues[i].toString());
    }
    let result = results.every( e => e == true);
    return result;
  }