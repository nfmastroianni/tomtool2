/**
 * This function is responsible for producing the report cards for
 * individual students
 *
 * @param {string} grade 3, 4, mixed
 * @returns {boolean}
 */
function generateReports(grade) {
  //before copying sheets from template, we need to know what language (and grade)
  var ss = SpreadsheetApp.getActive();
  var sheetObject = ss.getSheetByName("studentResults");
  var data = {};
  // use the _readData function to convert sheet data (array)
  // into object and store it in data variable
  data.records = _readData(sheetObject);
  for (r = 0; r < data.records.length; r++) {
    var record = data.records[r];
    var lang;
    // if no language is specified default is English
    if (!record["Language_(Language)"]) {
      lang = "English";
    } else {
      lang = record["Language_(Language)"];
    }

    var student = record.Student;
    copySheet(grade, lang, ss);
    var sheets = ss.getSheets();
    var lastSheet = sheets.length - 1;
    var newSheet = sheets[lastSheet];
    newSheet.setName(student);
  }
  //sheets copied and renamed
  //time to fill them out
  sheets = ss.getSheets();
  for (i = 1; i < sheets.length; i++) {
    record = data.records[i - 1];
    fillHeading(record, sheets[i]);
    fillSEL(record, sheets[i]);
    fillELA(record, sheets[i]);
    fillMath(record, sheets[i]);
  }
  return true;
}

/**
 *
 * @param {string} grade 3, 4, mixed
 * @param {string} language English, Spanish, Portuguese
 * @param {string} ss id of the current spreadsheet
 */
function copySheet(grade, language, ss) {
  var sheetName = grade + "-" + language;
  var ts = SpreadsheetApp.openById(
    "1j_oLC33TnsnTFGY0-7UNtSq9eOB4bWY1_41t5YGonA8"
  );
  var sheetToCopy = ts.getSheetByName(sheetName);
  sheetToCopy.copyTo(ss);
}

/**
 *
 * @param {object} record individual student data stored in _readData above
 * @param {object} sheet sheet object (https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en)
 */
function fillHeading(record, sheet) {
  var d = new Date();
  record["Result_Date"] = d.toLocaleDateString();
  var heading = {
    "Absence_(Days_Absent)": "C2",
    Student: "B5",
    Teacher: "F5",
    Result_Date: "J5",
  };
  Object.entries(heading).forEach(function ([key, value]) {
    sheet.getRange(value).setValue(record[`${key}`]);
  });
}

/**
 *
 * @param {object} record record individual student data stored in _readData above
 * @param {object} sheet heet object (https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en)
 */
function fillSEL(record, sheet) {
  var sel = {
    "Social_Emotional_1-3_(Language)": {
      0: "B10",
      1: "F10",
      2: "J10",
    },
    "Social_Emotional_1-3_(Problem_Solving)": {
      0: "B14",
      1: "F14",
      2: "J14",
    },
    "Social_Emotional_1-3_(Rules)": {
      0: "B18",
      1: "F18",
      2: "J18",
    },
    "Social_Emotional_4-6_(Focus)": {
      0: "B22",
      1: "F22",
      2: "J22",
    },
    "Social_Emotional_4-6_(Positive_Interactions)": {
      0: "B26",
      1: "F26",
      2: "J26",
    },
    "Social_Emotional_4-6_(Persistence)": {
      0: "B30",
      1: "F30",
      2: "J30",
    },
  };
  Object.entries(sel).forEach(function ([key, value]) {
    Object.entries(value).forEach(function ([k, v]) {
      if (record[`${key}`] == k) {
        sheet.getRange(v).setFormula("=char(10003)");
      }
    });
  });
}

/**
 *
 * @param {object} record record individual student data stored in _readData above
 * @param {object} sheet heet object (https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en)
 */
function fillELA(record, sheet) {
  var ela = {
    "ELA_1-4_(Oral_Language)": {
      Gestures: "C35",
      "Repeats parts of activity": "E35",
      "Words and gestures begin to go together": "G35",
      "Hand gestures for 3-4 fingerplays": "I35",
      "Hand gestures for 5-7 fingerplays": "K35",
    },
    "ELA_1-4_(Language_Acquisition)": {
      Gesture: "C39",
      '"I" Statements': "E39",
      Phrases: "G39",
      Sentences: "I39",
      Stories: "K39",
    },
    "ELA_1-4_(Letter_Recognition)": {
      0: "C44",
      "1-6": "E44",
      "7-13": "G44",
      "14-20": "I44",
      "21-26": "K44",
    },
    "ELA_1-4_(Letter_Sound_Recognition)": {
      0: "C48",
      "1-6": "E48",
      "7-13": "G48",
      "14-20": "I48",
      "21-26": "K48",
    },
    "ELA_5-8_(Phonological_Awareness_Rhyming)": {
      Emerging: "B52",
      "Rhyme Exposure: Joins in songs and games": "D52",
      "Rhyme Recognition": "F52",
      "Rhyme Judgement": "H52",
      "Produces Rhymes": "J52",
      "Identify rhyming patterns": "L52",
    },
    "ELA_5-8_(Phonemic_Awareness_Sounds)": {
      Emerging: "A56",
      "Repeats Mimics alliterations": "C56",
      "Recognition: decides if beginning sounds match": "E56",
      "Judgement: beginning sounds": "G56",
      "Isolates beginning sounds in words": "I56",
      "Isolates ending sounds in words": "K56",
      "Verbally blends one syllable words": "M56",
    },
    "ELA_5-8_(Concepts_of_Print)": {
      "Holds book correctly": "C61",
      "Identifies between pictures and words": "E61",
      "Demonstrates directionality": "G61",
      "Difference between letters and words": "I61",
      "Uses pictures as a picture walk": "K61",
    },
    "ELA_5-8_(Reading_Literature)": {
      Emerging: "B65",
      "Answers are not related to question": "D65",
      "Points gestures needs prompts to respond": "F65",
      "Connects to own experiences": "H65",
      "Retells some events from familiar story w/ prompt": "J65",
      "Retells part of event in sequence using text/pics": "L65",
    },
    "ELA_9-12_(Reading_Informational)": {
      Emerging: "B69",
      "Points or gestures to what is interesting": "D69",
      "Gives the name of something from the book": "F69",
      "Answers comprehension question independently": "H69",
      "Describes a fact from the text with detail": "J69",
      "Remembers more than one fact from the book with de": "L69",
    },
    "ELA_9-12_(Vocabulary)": {
      Emerging: "B73",
      "Shows understanding of everyday words": "D73",
      "Shows understanding of new word by acting it out": "F73",
      "Uses the word in story lab to describe": "H73",
      "Applies the word in new situation": "J73",
      "Uses synonyms for the word as well as examples to": "L73",
    },
    "ELA_9-12_(Writing)": {
      Plan: "D77",
      Picture: "E77",
      Message: "F77",
      Lines: "G77",
      "Initial Sounds": "H77",
      "Ending Sounds": "I77",
      "Medial Sounds": "J77",
      "Alphabetic Principle": "K77",
    },
    "ELA_9-12_(Graphics_Practice)": {
      "Holds marker with fist or whole hand jabs": "C81",
      "Motor movement for Level 1 figures": "E81",
      "Motor movement for Level 2-3 figures": "G81",
      "Motor movement for Level 4-5 figures": "I81",
      "Showcasing letters and numeral formation": "K81",
    },
  };
  Object.entries(ela).forEach(function ([key, value]) {
    Object.entries(value).forEach(function ([k, v]) {
      if (record[`${key}`] == k) {
        sheet.getRange(v).setFormula("=char(10003)");
      }
    });
  });
}

/**
 *
 * @param {object} record record individual student data stored in _readData above
 * @param {object} sheet heet object (https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=en)
 */
function fillMath(record, sheet) {
  var math = {
    "Math_(Counting_Objects)": {
      Emerging: "A86",
      "Verbally counts to 5": "B86",
      "Verbally counts to 10": "D86",
      "1-1 corresp up to 5": "E86",
      "Accurately counts up to 5 answers how many": "G86",
      "Accurately counts up to 10 answers how many": "I86",
      "Recognizes/names written numbers up to 10": "K86",
      "Understands nums as symbols begins to write 0-10": "M86",
    },
    "Math_(Shapes)": {
      Emerging: "B91",
      "Recognizes and names shapes": "D91",
      "Recognizes shapes same when rotated": "F91",
      "Uses materials to create 2D shapes": "H91",
      "Manipulates compares discusses 2D shapes": "J91",
      "Manipulates compares discusses 3D shapes": "L91",
    },
    "Math_(Sorting)": {
      Emerging: "C95",
      "Matches objects that are identical": "E95",
      "Sorts objects into small groups by 1 attribute": "G95",
      "Reclassifies already sorted objects by attribute": "I95",
      "Classifies/compares subgroups within larger groups": "K95",
    },
    "Math_(Measurement)": {
      Emerging: "C99",
      "Begins to use concepts of measurement for puzzles": "E99",
      "Compares objects & uses comparative language": "G99",
      "Orders 5 objects from shortest to longest": "I99",
      "Measures using a common base describes attribute": "K99",
    },
  };
  Object.entries(math).forEach(function ([key, value]) {
    Object.entries(value).forEach(function ([k, v]) {
      if (record[`${key}`] == k) {
        sheet.getRange(v).setFormula("=char(10003)");
      }
    });
  });
}
