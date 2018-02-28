const noop = () => {};

const getConsole = output => {
  return output ? console.log : noop;
};

module.exports = getConsole;
