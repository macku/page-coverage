#!/usr/bin/env node
const meow = require('meow');
const openUrl = require('./open-url');

const cli = meow(`
	Usage
	  $ page-coverage <url>

	Options
	  --noHeadless, -nh   Open browser (no headless mode)
	  --noClose,    -nc   Don't close browser window when finished (only with no headless mode)
	  --timeout,    -t    Navigation timeout (in ms). Default 3000ms

	Examples
	  $ page-coverage http://google.com 
	  $ page-coverage http://google.com --no-headless
	  $ page-coverage http://google.com --no-headless --no-close
`, {
  flags: {
    noHeadless: {
      type: 'boolean',
      alias: 'nh',
      default: false,
    },

    noClose: {
      type: 'boolean',
      alias: 'nc',
      default: false,
    },

    timeout: {
      type: 'number',
      alias: 't',
      default: (30 * 1000)
    },

    json: {
      type: 'string',
      default: false,
      alias: 'j'
    }
  }
});
if (cli.input.length < 1) {
  cli.showHelp();
}

const [ url ] = cli.input;
const { noHeadless, noClose, timeout } = cli.flags;

openUrl(url, {
  headless: !noHeadless,
  closeBrowser: !noClose,
  timeout
});
