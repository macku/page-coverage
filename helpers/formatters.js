const chalk = require('chalk');

const { progressBarSize } = require('./settings');

const defaultBarChar = '▀';
const defaultBarSize = progressBarSize;
const defaultBarColor = chalk.green;
const defaultBgColor = chalk.red;

const defaultOptions = {
  barChar: defaultBarChar,
  barSize: defaultBarSize,
  barColor: defaultBarColor,
  barBgColor: defaultBgColor,
};

const fillBarPart = ({ size, fillWith, fillWithColor }) => (
  new Array(size).join(fillWithColor(fillWith))
);

const progressBar = (value, options = {}) => {
  const { barChar, barSize, barColor, barBgColor } = { ...defaultOptions, ...options };

  const valueBarSize = Number((value * barSize / 100).toFixed(0));
  const bgBarSize = barSize - valueBarSize;

  const valueBar = fillBarPart({
    size: valueBarSize,
    fillWith: barChar,
    fillWithColor: barColor,
  });
  const bgBar = fillBarPart({
    size: bgBarSize,
    fillWith: barChar,
    fillWithColor: barBgColor,
  });

  return `${valueBar}${bgBar}`;
};

module.exports = { progressBar };
