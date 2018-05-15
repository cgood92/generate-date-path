const moment = require("moment");
const { shuffleArray } = require("./util/common");
const { daysDiff } = require("./util/generators");
const operations = require("./util/operations");
const numberGenerators = require("./util/generators");

const MIN_STEPS = 4;

const recurse = (
  { steps = 0, targetNumber, dates = inputDates, crumbs = [] },
  acc = 0
) => {
  const [date, ...restDates] = dates;
  if (!date) {
    // Start again
    return null;
  }
  const [operation] = shuffleArray(operations);
  const [generator] = shuffleArray(numberGenerators);
  const generated = generator(date.date);
  const result = operation(acc, generated);
  const newCrumbs = crumbs.concat(
    `${operation.displayName} the ${generator.displayName} of ${moment(
      date.date
    ).format("MM/DD/YYYY")} (the day ${date.label}) => ${acc} ${
      operation.sign
    } ${generated} = ${result}`
  );
  if (result === targetNumber) {
    // Not complex enough
    if (steps < MIN_STEPS) {
      return null;
    }
    return newCrumbs;
  }
  return recurse(
    { steps: steps + 1, targetNumber, dates: restDates, crumbs: newCrumbs },
    result
  );
};

const generateCalculation = (targetDate, inputDates, inputNumbers) => {
  const targetNumber = daysDiff(targetDate);
  let crumbs = null;
  let startingNumber = null;
  while (crumbs === null) {
    startingNumber = shuffleArray(inputNumbers)[0];
    crumbs = recurse(
      {
        dates: shuffleArray(inputDates),
        targetNumber
      },
      startingNumber.value
    );
  }
  const reason = crumbs.join("\n\n");
  return `Today is a very special day.  Because if you start with the number ${
    startingNumber.value
  }, which is ${
    startingNumber.label
  }, and do the following:\n\n${reason}.\n\nWhich happens to be how many days are left until ${moment(
    targetDate
  ).format("MMMM Do, YYYY")}.`;
};

module.exports = generateCalculation;
