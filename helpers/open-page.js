async function openPage(page, { url, timeout, cookies, headers }) {
  page.setDefaultNavigationTimeout(timeout);

  if (headers) {
    await page.setExtraHTTPHeaders(headers);
  }

  if (cookies) {
    await page.setCookie(...cookies);
  }

  return page.goto(url);
}

module.exports = openPage;
