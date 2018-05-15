const plus = (a, b) => a + b;
plus.displayName = "Add";
plus.sign = "+";

const minus = (a, b) => a - b;
minus.displayName = "Subtract";
minus.sign = "-";

const times = (a, b) => a * b;
times.displayName = "Multiply";
times.sign = "x";

const divide = (a, b) => a / b;
divide.displayName = "Divide";
divide.sign = "/";

module.exports = [plus, minus, times, divide];
