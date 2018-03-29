async function openPage(page, { url, timeout, cookies, headers, post }) {
  page.setDefaultNavigationTimeout(timeout * 1000);

  if (post) {
    await page.setRequestInterception(true);

    page.on('request', (request) => {
      const overrides = {};

      if (request.url() === url) {
        overrides.method = 'POST';
        overrides.postData = post;
      }

      request.continue(overrides);
    });
  }

  if (headers) {
    await page.setExtraHTTPHeaders(headers);
  }

  if (cookies) {
    await page.setCookie(...cookies);
  }

  return page.goto(url);
}

module.exports = openPage;
