function createSheet(title, index) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.insertSheet(title, index).getSheetId();
  const ssInfo = {
    ssheet: ss,
    sheet: sheet,
  };
  return ssInfo;
}

/**
 * Takes a positive integer and returns the corresponding column name.
 * @param {number} num  The positive integer to convert to a column name.
 * @return {string}  The column name.
 */
function toColumnName(num) {
  for (var ret = "", a = 1, b = 26; (num -= a) >= 0; a = b, b *= 26) {
    ret = String.fromCharCode(parseInt((num % b) / a) + 65) + ret;
  }
  return ret;
}

/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */
function buildAnalysisSheet3() {
  // Step 1 Copy the Analysis Sheet into the active Spreadsheet
  const ss = SpreadsheetApp.getActive();
  // Check if analysis sheet exists, if so, delete it
  if (ss.getSheetByName("analysis")) {
    ss.deleteSheet(ss.getSheetByName("analysis"));
  }
  let templateSS = SpreadsheetApp.openById(
    "1j_oLC33TnsnTFGY0-7UNtSq9eOB4bWY1_41t5YGonA8"
  );
  let sheetToCopy = templateSS.getSheetByName("analysis");
  sheetToCopy.copyTo(ss).setName("analysis");
  const analysisSheet = ss.getSheetByName("analysis").activate();
  const dataSheet = ss.getSheetByName("studentResults");
  // Step 2 traverse the data array and grab column data
  data[0].SEL.forEach((skill, i) => {
    // Grab the data for this skill
    // It may contain null results that need to be ARRAY.FILTER removed
    const unfilteredSkillData = dataSheet
      .getRange(2, i + 11, dataSheet.getLastRow())
      .getValues()
      .map((result) => {
        if (result[0] !== "") {
          return result[0];
        } else {
          return null;
        }
      });
    const skillData = unfilteredSkillData.filter((result) => result !== null);
    let belowCount, meetingCount, exceedingCount;
    belowCount = meetingCount = exceedingCount = 0;
    skillData.forEach((rating) => {
      if (skill.ratings[`${rating}`]["3F"] === "below") {
        belowCount += 1;
      } else if (skill.ratings[`${rating}`]["3F"] === "meeting") {
        meetingCount += 1;
      } else {
        exceedingCount += 1;
      }
    });
    // Below Meeting Exceeding Counts are Ready
    // Convert to decimal/percent
    let belowDecimal = belowCount / skillData.length;
    let meetingDecimal = meetingCount / skillData.length;
    let exceedingDecimal = exceedingCount / skillData.length;
    // Build 2D array to insert
    const ratingRow = [[belowDecimal, meetingDecimal, exceedingDecimal]];
    analysisSheet
      .getRange(i + 2, 2, 1, 3)
      .setValues(ratingRow)
      .setNumberFormat("??0.#%");
  });
  data[1].ELA.forEach((skill, i) => {
    // Grab the data for this skill
    // It may contain null results that need to be ARRAY.FILTER removed
    const unfilteredSkillData = dataSheet
      .getRange(2, i + 17, dataSheet.getLastRow())
      .getValues()
      .map((result) => {
        if (result[0] !== "") {
          return result[0];
        } else {
          return null;
        }
      });
    const skillData = unfilteredSkillData.filter((result) => result !== null);
    let belowCount, meetingCount, exceedingCount;
    belowCount = meetingCount = exceedingCount = 0;
    skillData.forEach((rating) => {
      if (skill.ratings[`${rating}`]["4F"] === "below") {
        belowCount += 1;
      } else if (skill.ratings[`${rating}`]["4F"] === "meeting") {
        meetingCount += 1;
      } else {
        exceedingCount += 1;
      }
    });
    // Below Meeting Exceeding Counts are Ready
    // Convert to decimal/percent
    let belowDecimal = belowCount / skillData.length;
    let meetingDecimal = meetingCount / skillData.length;
    let exceedingDecimal = exceedingCount / skillData.length;
    // Build 2D array to insert
    const ratingRow = [[belowDecimal, meetingDecimal, exceedingDecimal]];
    analysisSheet
      .getRange(i + 8, 2, 1, 3)
      .setValues(ratingRow)
      .setNumberFormat("??0.#%");
  });
  data[2].Math.forEach((skill, i) => {
    // Grab the data for this skill
    // It may contain null results that need to be ARRAY.FILTER removed
    const unfilteredSkillData = dataSheet
      .getRange(2, i + 29, dataSheet.getLastRow())
      .getValues()
      .map((result) => {
        if (result[0] !== "") {
          return result[0];
        } else {
          return null;
        }
      });
    const skillData = unfilteredSkillData.filter((result) => result !== null);
    let belowCount, meetingCount, exceedingCount;
    belowCount = meetingCount = exceedingCount = 0;
    skillData.forEach((rating) => {
      if (skill.ratings[`${rating}`]["4F"] === "below") {
        belowCount += 1;
      } else if (skill.ratings[`${rating}`]["4F"] === "meeting") {
        meetingCount += 1;
      } else {
        exceedingCount += 1;
      }
    });
    // Below Meeting Exceeding Counts are Ready
    // Convert to decimal/percent
    let belowDecimal = belowCount / skillData.length;
    let meetingDecimal = meetingCount / skillData.length;
    let exceedingDecimal = exceedingCount / skillData.length;
    // Build 2D array to insert
    const ratingRow = [[belowDecimal, meetingDecimal, exceedingDecimal]];
    analysisSheet
      .getRange(i + 20, 2, 1, 3)
      .setValues(ratingRow)
      .setNumberFormat("??0.#%");
  });
}
/**
 * +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 */

function buildAnalysisSheet4() {
  // Step 1 Copy the Analysis Sheet into the active Spreadsheet
  const ss = SpreadsheetApp.getActive();
  // Check if analysis sheet exists, if so, delete it
  if (ss.getSheetByName("analysis")) {
    ss.deleteSheet(ss.getSheetByName("analysis"));
  }
  let templateSS = SpreadsheetApp.openById(
    "1j_oLC33TnsnTFGY0-7UNtSq9eOB4bWY1_41t5YGonA8"
  );
  let sheetToCopy = templateSS.getSheetByName("analysis");
  sheetToCopy.copyTo(ss).setName("analysis");
  const analysisSheet = ss.getSheetByName("analysis").activate();
  const dataSheet = ss.getSheetByName("studentResults");
  // Step 2 traverse the data array and grab column data
  data[0].SEL.forEach((skill, i) => {
    // Grab the data for this skill
    // It may contain null results that need to be ARRAY.FILTER removed
    const unfilteredSkillData = dataSheet
      .getRange(2, i + 11, dataSheet.getLastRow())
      .getValues()
      .map((result) => {
        if (result[0] !== "") {
          return result[0];
        } else {
          return null;
        }
      });
    const skillData = unfilteredSkillData.filter((result) => result !== null);
    let belowCount, meetingCount, exceedingCount;
    belowCount = meetingCount = exceedingCount = 0;
    skillData.forEach((rating) => {
      if (skill.ratings[`${rating}`]["4F"] === "below") {
        belowCount += 1;
      } else if (skill.ratings[`${rating}`]["4F"] === "meeting") {
        meetingCount += 1;
      } else {
        exceedingCount += 1;
      }
    });
    // Below Meeting Exceeding Counts are Ready
    // Convert to decimal/percent
    let belowDecimal = belowCount / skillData.length;
    let meetingDecimal = meetingCount / skillData.length;
    let exceedingDecimal = exceedingCount / skillData.length;
    // Build 2D array to insert
    const ratingRow = [[belowDecimal, meetingDecimal, exceedingDecimal]];
    analysisSheet
      .getRange(i + 2, 2, 1, 3)
      .setValues(ratingRow)
      .setNumberFormat("??0.#%");
  });
  data[1].ELA.forEach((skill, i) => {
    // Grab the data for this skill
    // It may contain null results that need to be ARRAY.FILTER removed
    const unfilteredSkillData = dataSheet
      .getRange(2, i + 17, dataSheet.getLastRow())
      .getValues()
      .map((result) => {
        if (result[0] !== "") {
          return result[0];
        } else {
          return null;
        }
      });
    const skillData = unfilteredSkillData.filter((result) => result !== null);
    let belowCount, meetingCount, exceedingCount;
    belowCount = meetingCount = exceedingCount = 0;
    skillData.forEach((rating) => {
      if (skill.ratings[`${rating}`]["4F"] === "below") {
        belowCount += 1;
      } else if (skill.ratings[`${rating}`]["4F"] === "meeting") {
        meetingCount += 1;
      } else {
        exceedingCount += 1;
      }
    });
    // Below Meeting Exceeding Counts are Ready
    // Convert to decimal/percent
    let belowDecimal = belowCount / skillData.length;
    let meetingDecimal = meetingCount / skillData.length;
    let exceedingDecimal = exceedingCount / skillData.length;
    // Build 2D array to insert
    const ratingRow = [[belowDecimal, meetingDecimal, exceedingDecimal]];
    analysisSheet
      .getRange(i + 8, 2, 1, 3)
      .setValues(ratingRow)
      .setNumberFormat("??0.#%");
  });
  data[2].Math.forEach((skill, i) => {
    // Grab the data for this skill
    // It may contain null results that need to be ARRAY.FILTER removed
    const unfilteredSkillData = dataSheet
      .getRange(2, i + 29, dataSheet.getLastRow())
      .getValues()
      .map((result) => {
        if (result[0] !== "") {
          return result[0];
        } else {
          return null;
        }
      });
    const skillData = unfilteredSkillData.filter((result) => result !== null);
    let belowCount, meetingCount, exceedingCount;
    belowCount = meetingCount = exceedingCount = 0;
    skillData.forEach((rating) => {
      if (skill.ratings[`${rating}`]["4F"] === "below") {
        belowCount += 1;
      } else if (skill.ratings[`${rating}`]["4F"] === "meeting") {
        meetingCount += 1;
      } else {
        exceedingCount += 1;
      }
    });
    // Below Meeting Exceeding Counts are Ready
    // Convert to decimal/percent
    let belowDecimal = belowCount / skillData.length;
    let meetingDecimal = meetingCount / skillData.length;
    let exceedingDecimal = exceedingCount / skillData.length;
    // Build 2D array to insert
    const ratingRow = [[belowDecimal, meetingDecimal, exceedingDecimal]];
    analysisSheet
      .getRange(i + 20, 2, 1, 3)
      .setValues(ratingRow)
      .setNumberFormat("??0.#%");
  });
}

const data = [
  {
    SEL: [
      {
        title: "Social Emotional 1-3 (Language)",
        description: "Uses language to regulate own behavior.",
        ratings: {
          0: {
            "3F": "below",
            "4F": "below",
          },
          1: {
            "3F": "meeting",
            "4F": "below",
          },
          2: {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
      {
        title: "Social Emotional 1-3 (Problem Solving)",
        description: "Can social problem-solve",
        ratings: {
          0: {
            "3F": "below",
            "4F": "below",
          },
          1: {
            "3F": "meeting",
            "4F": "below",
          },
          2: {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
      {
        title: "Social Emotional 1-3 (Rules)",
        description: "Uses 'rules' during learning activities.",
        ratings: {
          0: {
            "3F": "below",
            "4F": "below",
          },
          1: {
            "3F": "meeting",
            "4F": "below",
          },
          2: {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
      {
        title: "Social Emotional 4-6 (Focus)",
        description:
          "Is able to focus attention until task/activity is finished (i.e., follows through on plan when in play).",
        ratings: {
          0: {
            "3F": "below",
            "4F": "below",
          },
          1: {
            "3F": "meeting",
            "4F": "below",
          },
          2: {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
      {
        title: "Social Emotional 4-6 (Positive Interactions)",
        description: "Engages in Positive Interaction with peers.",
        ratings: {
          0: {
            "3F": "below",
            "4F": "below",
          },
          1: {
            "3F": "meeting",
            "4F": "below",
          },
          2: {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
      {
        title: "Social Emotional 4-6 (Persistence)",
        description:
          "Has task persistence. Keeps trying and is not upset by initial difficulties.",
        ratings: {
          0: {
            "3F": "below",
            "4F": "below",
          },
          1: {
            "3F": "meeting",
            "4F": "below",
          },
          2: {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
    ],
  },
  {
    ELA: [
      {
        title: "ELA 5-8 (Reading Literature)",
        description: "Reading: Letter Recognition",
        ratings: {
          0: {
            "3F": "below",
            "4F": "below",
          },
          "1-6": {
            "3F": "meeting",
            "4F": "below",
          },
          "7-13": {
            "3F": "exceeding",
            "4F": "below",
          },
          "14-20": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "21-26": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "ELA 1-4 (Letter Sound Recognition)",
        description: "Reading: Letter Sounds",
        ratings: {
          0: {
            "3F": "below",
            "4F": "below",
          },
          "1-6": {
            "3F": "meeting",
            "4F": "below",
          },
          "7-13": {
            "3F": "exceeding",
            "4F": "below",
          },
          "14-20": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "21-26": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "ELA 1-4 (Oral Language)",
        description: "Oral Language Attention Focus Activities",
        ratings: {
          Gestures: {
            "3F": "below",
            "4F": "below",
          },
          "Repeats parts of activity": {
            "3F": "below",
            "4F": "below",
          },
          "Words and gestures begin to go together": {
            "3F": "below",
            "4F": "below",
          },
          "Hand gestures for 3-4 fingerplays": {
            "3F": "meeting",
            "4F": "below",
          },
          "Hand gestures for 5-7 fingerplays": {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
      {
        title: "ELA 1-4 (Language Acquisition)",
        description: "Language Acquisition",
        ratings: {
          Gesture: {
            "3F": "below",
            "4F": "below",
          },
          "&quot;I&quot; Statements": {
            "3F": "below",
            "4F": "below",
          },
          Phrases: {
            "3F": "below",
            "4F": "below",
          },
          Sentences: {
            "3F": "meeting",
            "4F": "below",
          },
          Stories: {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
      {
        title: "ELA 5-8 (Reading Literature)",
        description: "Reading: Literature",
        ratings: {
          "Answers are not related to question": {
            "3F": "below",
            "4F": "below",
          },
          "Points gestures to respond": {
            "3F": "below",
            "4F": "below",
          },
          "Answers questions independently": {
            "3F": "meeting",
            "4F": "below",
          },
          "Discusses several things about the book": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Paraphrases or recounts story events": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "ELA 5-8 (Phonological Awareness)",
        description: "Phonological Awareness Rhyming",
        ratings: {
          "Participates in rhyming activities with group": {
            "3F": "below",
            "4F": "below",
          },
          "Rhyme Recognition": {
            "3F": "meeting",
            "4F": "below",
          },
          "Rhyme Judgement": {
            "3F": "exceeding",
            "4F": "below",
          },
          "Produces Rhymes": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Identify rhyming patterns": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "ELA 5-8 (Phonemic Awareness)",
        description:
          "Phonemic Awareness Beginning/Ending Sounds/Blending Sounds",
        ratings: {
          "Repeats Mimics alliterations": {
            "3F": "meeting",
            "4F": "below",
          },
          "Recognize beginning sounds of words": {
            "3F": "exceeding",
            "4F": "below",
          },
          "Judgement of beginning sounds": {
            "3F": "exceeding",
            "4F": "below",
          },
          "Isolate beginning sounds in words": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Isolates ending sounds in words": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
          "Verbally blends one syllable words": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "ELA 5-8 (Concepts of Print)",
        description: "Concepts of Print",
        ratings: {
          "Holds book correctly": {
            "3F": "below",
            "4F": "below",
          },
          "Identifies between pictures and words": {
            "3F": "below",
            "4F": "below",
          },
          "Demonstrates directionality": {
            "3F": "meeting",
            "4F": "below",
          },
          "Difference between letters and words": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Uses pictures as a picture walk": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },

      {
        title: "ELA 9-12 (Reading Informational)",
        description: "Reading:Informational",
        ratings: {
          "Points or gestures to what is interesting": {
            "3F": "below",
            "4F": "below",
          },
          "Gives the name of something from the book": {
            "3F": "below",
            "4F": "below",
          },
          "Connects to own experiences": {
            "3F": "meeting",
            "4F": "below",
          },
          "Describes a fact from the text with detail": {
            "3F": "exceeding",
            "4F": "below",
          },
          "Remembers more than one fact from the book with de": {
            "3F": "exceeding",
            "4F": "meeting",
          },
        },
      },
      {
        title: "ELA 9-12 (Vocabulary)",
        description: "Vocabulary",
        ratings: {
          "Shows understanding of everyday words": {
            "3F": "below",
            "4F": "below",
          },
          "Shows understanding of new word by acting it out": {
            "3F": "below",
            "4F": "below",
          },
          "Uses the word in story lab to describe": {
            "3F": "meeting",
            "4F": "below",
          },
          "Applies the word in new situation": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Uses synonyms for the word as well as examples to": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "ELA 9-12 (Writing)",
        description: "Writing",
        ratings: {
          Plan: {
            "3F": "below",
            "4F": "below",
          },
          Picture: {
            "3F": "below",
            "4F": "below",
          },
          Message: {
            "3F": "below",
            "4F": "below",
          },
          Lines: {
            "3F": "meeting",
            "4F": "below",
          },
          IS: {
            "3F": "exceeding",
            "4F": "meeting",
          },
          ES: {
            "3F": "exceeding",
            "4F": "exceeding",
          },
          MS: {
            "3F": "exceeding",
            "4F": "exceeding",
          },
          AP: {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "ELA 9-12 (Graphics Practice)",
        description: "Graphics Practice",
        ratings: {
          "Holds marker with fist or whole hand jabs the boar": {
            "3F": "below",
            "4F": "below",
          },
          "Motor movement for Level 1 figures": {
            "3F": "below",
            "4F": "below",
          },
          "Motor movement for Level 2-3 figures": {
            "3F": "meeting",
            "4F": "below",
          },
          "Motor movement for Level 4-5 figures": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Showcasing letters and numeral formation": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
    ],
  },
  {
    Math: [
      {
        title: "Math 1-2 (Counting Objects)",
        description: "Counting & Counting Objects",
        ratings: {
          "Counts with or without correct number order": {
            "3F": "below",
            "4F": "below",
          },
          "Counts to 5 and tells how many": {
            "3F": "below",
            "4F": "below",
          },
          "Counts to 10 and tells how many": {
            "3F": "meeting",
            "4F": "below",
          },
          "Counts up to 20 and tells how many": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Compare sets of objects to 10": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
          "Add and subtract up to 5": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "Math 1-2 (Recognizing Numbers)",
        description: "Recognizing Numbers",
        ratings: {
          "Recognizes numbers in the environment": {
            "3F": "below",
            "4F": "below",
          },
          "Recognizes numerals 1-5": {
            "3F": "below",
            "4F": "below",
          },
          "Recognizes and writes numbers 1-5": {
            "3F": "meeting",
            "4F": "below",
          },
          "Recognizes and writes numbers 1-10": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Recognizes and writes numerals 11-20": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "Math 3-5 (Shapes)",
        description: "Geometry/Shapes",
        ratings: {
          "Begins to identify basic shapes": {
            "3F": "below",
            "4F": "below",
          },
          "Identifies and can draw  basic shapes": {
            "3F": "below",
            "4F": "below",
          },
          "Use materials to create 2D shapes": {
            "3F": "meeting",
            "4F": "below",
          },
          "Recognizes and names 3D shapes": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Understands the connection b/w 3D and 2D shapes": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "Math 3-5 (Sorting)",
        description: "Classification/Sorting",
        ratings: {
          "Matches objects that are identical": {
            "3F": "below",
            "4F": "below",
          },
          "Sorts objects into small groups by 1 attribute": {
            "3F": "meeting",
            "4F": "below",
          },
          "Reclassifies already sorted objects by attribute": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Classifies/compares subgroups within larger groups": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
      {
        title: "Math 3-5 (Measurement)",
        description: "Measurement",
        ratings: {
          "Begins to use concepts of measurement for puzzles": {
            "3F": "below",
            "4F": "below",
          },
          "Compares objects &amp; uses comparative language": {
            "3F": "meeting",
            "4F": "below",
          },
          "Orders 5 objects from shortest to longest": {
            "3F": "exceeding",
            "4F": "meeting",
          },
          "Measures using a common base describes attribute": {
            "3F": "exceeding",
            "4F": "exceeding",
          },
        },
      },
    ],
  },
];
