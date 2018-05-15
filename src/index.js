const generateCalculation = require("./generate");
const { targetDate, dates, numbers } = require("./data");

const message = generateCalculation(targetDate, dates, numbers);
console.log(message);
