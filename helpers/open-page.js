async function openPage(page, url) {
  return page.goto(url);
}

module.exports = openPage;
