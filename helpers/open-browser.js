const puppeteer = require('puppeteer');

module.exports = async function openBrowser(options = {}) {
  const launchOptions = {
    headless: true,
    ...options,
  };

  return await puppeteer.launch(launchOptions);
};
