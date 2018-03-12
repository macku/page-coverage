const validUrl = require('valid-url');

const openBrowser = require('./helpers/open-browser');
const openPage = require('./helpers/open-page');
const withCoverage = require('./with-coverage');
const formatCoverage = require('./helpers/format-coverage');
const getConsole = require('./helpers/get-console');

module.exports = async function openUrl(url, {
  headless,
  closeBrowser,
  timeout,
  headers,
  cookies,
  json
}) {
  if (!validUrl.isWebUri(url)) {
    console.log(`The passed URL "${url}" doesn't look a like valid address`);
    process.exit(1);
  }

  let browser;
  const verboseOutput = !json;
  const consoleOutput = getConsole(verboseOutput);

  try {
    consoleOutput('Collecting the JS and CSS coverage usage. Please wait...');

    browser = await openBrowser({ headless });

    const pageWithCoverage = await withCoverage(browser);
    const { jsCoverage, cssCoverage, pageUrl } = await pageWithCoverage(openPage, {
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

    process.stdout.write('\033c');
    console.log(formatCoverage(url, pageUrl, coverage, json));
  } catch (e) {
    console.log(`[Error] ${e.message}`);
    process.exit(1);
  } finally {
    if (browser) {
      if (!headless && !closeBrowser) {
        browser.disconnect();

        consoleOutput('You need to manually close to process and browser window by pressing Ctrl+C or Cmd+C');
      } else {
        await browser.close();
      }
    }
  }
};
