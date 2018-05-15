var ONE_DAY = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

const daysDiff = targetDate =>
  Math.round(Math.abs((new Date().getTime() - targetDate.getTime()) / ONE_DAY));
daysDiff.displayName =
  "amount of days between the time we get married and the date";

const sumOfParts = targetDate =>
  targetDate.getDate() + targetDate.getFullYear() + targetDate.getMonth() + 1;
sumOfParts.displayName = "sum of the day + month + year";

const sumOfDigits = targetDate =>
  [
    targetDate.getDate(),
    targetDate.getFullYear(),
    targetDate.getMonth() + 1
  ].reduce(
    (acc, d) =>
      acc + new String(d).split("").reduce((acc, d) => acc + new Number(d), 0),
    0
  );
sumOfDigits.displayName = "sum of the digits of the date";

module.exports = [daysDiff, sumOfParts, sumOfDigits];

module.exports.daysDiff = daysDiff;
