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
    "Absence_(Days_Absent)": "B2",
    Student: "A5",
    Teacher: "E5",
    Result_Date: "I5",
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
      0: "A10",
      1: "E10",
      2: "I10",
    },
    "Social_Emotional_1-3_(Problem_Solving)": {
      0: "A14",
      1: "E14",
      2: "I14",
    },
    "Social_Emotional_1-3_(Rules)": {
      0: "A18",
      1: "E18",
      2: "I18",
    },
    "Social_Emotional_4-6_(Focus)": {
      0: "A22",
      1: "E22",
      2: "I22",
    },
    "Social_Emotional_4-6_(Positive_Interactions)": {
      0: "A26",
      1: "E26",
      2: "I26",
    },
    "Social_Emotional_4-6_(Persistence)": {
      0: "A30",
      1: "E30",
      2: "I30",
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
      Gestures: "B35",
      "Repeats parts of activity": "D35",
      "Words and gestures begin to go together": "F35",
      "Hand gestures for 3-4 fingerplays": "H35",
      "Hand gestures for 5-7 fingerplays": "J35",
    },
    "ELA_1-4_(Language_Acquisition)": {
      Gesture: "B39",
      '"I" Statements': "D39",
      Phrases: "F39",
      Sentences: "H39",
      Stories: "J39",
    },
    "ELA_1-4_(Letter_Recognition)": {
      0: "B44",
      "1-6": "D44",
      "7-13": "F44",
      "14-20": "H44",
      "21-26": "J44",
    },
    "ELA_1-4_(Letter_Sound_Recognition)": {
      0: "B48",
      "1-6": "D48",
      "7-13": "F48",
      "14-20": "H48",
      "21-26": "J48",
    },
    "ELA_5-8_(Phonological_Awareness)": {
      "Participates in rhyming activities with group": "B52",
      "Rhyme Recognition": "D52",
      "Rhyme Judgement": "F52",
      "Produces Rhymes": "H52",
      "Identify rhyming patterns": "J52",
    },
    "ELA_5-8_(Phonemic_Awareness)": {
      "Repeats Mimics alliterations": "A56",
      "Recognize beginning sounds of words": "C56",
      "Judgement of beginning sounds": "E56",
      "Isolate beginning sounds in words": "G56",
      "Isolates ending sounds in words": "I56",
      "Verbally blends one syllable words": "K56",
    },
    "ELA_5-8_(Concepts_of_Print)": {
      "Holds book correctly": "B61",
      "Identifies between pictures and words": "D61",
      "Demonstrates directionality": "F61",
      "Difference between letters and words": "H61",
      "Uses pictures as a picture walk": "J61",
    },
    "ELA_5-8_(Reading_Literature)": {
      "Answers are not related to question": "B65",
      "Points gestures to respond": "D65",
      "Answers questions independently": "F65",
      "Discusses several things about the book": "H65",
      "Paraphrases or recounts story events": "J65",
    },
    "ELA_9-12_(Reading_Informational)": {
      "Points or gestures to what is interesting": "B69",
      "Gives the name of something from the book": "D69",
      "Connects to own experiences": "F69",
      "Describes a fact from the text with detail": "H69",
      "Remembers more than one fact from the book with de": "J69",
    },
    "ELA_9-12_(Vocabulary)": {
      "Shows understanding of everyday words": "B73",
      "Shows understanding of new word by acting it out": "D73",
      "Uses the word in story lab to describe": "F73",
      "Applies the word in new situation": "H73",
      "Uses synonyms for the word as well as examples to": "J73",
    },
    "ELA_9-12_(Writing)": {
      Plan: "C77",
      Picture: "D77",
      Message: "E77",
      Lines: "F77",
      IS: "G77",
      ES: "H77",
      MS: "I77",
      AP: "J77",
    },
    "ELA_9-12_(Graphics_Practice)": {
      "Holds marker with fist or whole hand jabs the boar": "B81",
      "Motor movement for Level 1 figures": "D81",
      "Motor movement for Level 2-3 figures": "F81",
      "Motor movement for Level 4-5 figures": "H81",
      "Showcasing letters and numeral formation": "J81",
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
    "Math_1-2_(Counting_Objects)": {
      "Counts with or without correct number order": "A86",
      "Counts to 5 and tells how many": "C86",
      "Counts to 10 and tells how many": "E86",
      "Counts up to 20 and tells how many": "G86",
      "Compare sets of objects to 10": "I86",
      "Add and subtract up to 5": "K86",
    },
    "Math_1-2_(Recognizing_Numbers)": {
      "Recognizes numbers in the environment": "B90",
      "Recognizes numerals 1-5": "D90",
      "Recognizes and writes numbers 1-5": "F90",
      "Recognizes and writes numbers 1-10": "H90",
      "Recognizes and writes numerals 11-20": "J90",
    },
    "Math_3-5_(Shapes)": {
      "Begins to identify basic shapes": "B94",
      "Identifies and can draw  basic shapes": "D94",
      "Use materials to create 2D shapes": "F94",
      "Recognizes and names 3D shapes": "H94",
      "Understands the connection b/w 3D and 2D shapes": "J94",
    },
    "Math_3-5_(Sorting)": {
      "Matches objects that are identical": "A98",
      "Sorts objects into small groups by 1 attribute": "D98",
      "Reclassifies already sorted objects by attribute": "G98",
      "Classifies/compares subgroups within larger groups": "J98",
    },
    "Math_3-5_(Measurement)": {
      "Begins to use concepts of measurement for puzzles": "A102",
      "Compares objects & uses comparative language": "D102",
      "Orders 5 objects from shortest to longest": "G102",
      "Measures using a common base describes attribute": "J102",
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
