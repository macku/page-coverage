const { startCoverage, stopCoverage } = require('./helpers/collect-code-coverage');

module.exports = async function withCoverage(page) {
  await startCoverage(page);

  return async function runWithCoverage(action, ...args) {
    const { closePage } = args;
    await action(page, ...args);

    const { jsCoverage, cssCoverage } = await stopCoverage(page);
    const pageUrl = page.url().replace(/\/$/, '');

    if (closePage) {
      await page.close();
    }

    return { jsCoverage, cssCoverage, pageUrl };
  };
};
