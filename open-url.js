const openBrowser = require('./helpers/open-browser');
const openPage = require('./helpers/open-page');
const withCoverage = require('./with-coverage');
const formatCoverage = require('./helpers/format-coverage');

module.exports = async function openUrl(url, {
  headless,
  closeBrowser,
  timeout,
  headers,
  cookies
}) {
  let browser;

  try {
    browser = await openBrowser({ headless });

    const pageWithCoverage = await withCoverage(browser);
    const { jsCoverage, cssCoverage } = await pageWithCoverage(openPage, {
      url,
      timeout,
      cookies,
      headers,
      closePage: closeBrowser
    });
    const coverage = [
      ...jsCoverage.map(results => ({
        ...results,
        type: 'JS'
      })),

      ...cssCoverage.map(results => ({
        ...results,
        type: 'CSS'
      })),
    ];

    const coverageReport = formatCoverage(coverage);

    process.stdout.write('\033c');
    console.log(`Coverage report for page: ${url}`);
    console.log(coverageReport);
  } catch (e) {
    console.log(e);
    process.exit(1);
  } finally {
    if (browser) {
      if (!headless && !closeBrowser) {
        browser.disconnect();

        console.log('You need to manually close to process and browser window by pressing Ctrl+C or Cmd+C');
      } else {
        await browser.close();
      }
    }
  }
};
