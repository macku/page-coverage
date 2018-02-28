const { startCoverage, stopCoverage } = require('./helpers/collect-code-coverage');

module.exports = async function withCoverage(browser) {
  const page = await browser.newPage();
  await startCoverage(page);

  console.log('Collecting the JS and CSS coverage usage. Please wait...');

  return async function runWithCoverage(action, ...args) {
    const { closePage } = args;
    await action(page, ...args);

    const { jsCoverage, cssCoverage } = await stopCoverage(page);

    if (closePage) {
      await page.close();
    }

    return { jsCoverage, cssCoverage };
  };
};
