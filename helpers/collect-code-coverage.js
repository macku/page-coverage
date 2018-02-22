async function startCoverage(page) {
  return await Promise.all([
    page.coverage.startJSCoverage(),
    page.coverage.startCSSCoverage(),
  ]);
}

async function stopCoverage(page) {
  const [jsCoverage, cssCoverage] = await Promise.all([
    page.coverage.stopJSCoverage(),
    page.coverage.stopCSSCoverage(),
  ]);

  return {
    jsCoverage,
    cssCoverage,
  };
}

module.exports = { startCoverage, stopCoverage };
