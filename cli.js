#!/usr/bin/env node
const meow = require('meow');
const openUrl = require('./open-url');

const parseCookieArg = require('./helpers/parse-cookie-arg');
const parseHeaderArg = require('./helpers/parse-header-arg');

const cli = meow({
  help: `
    Usage
      $ page-coverage <url>
  
    Options
      --noHeadless, -nh   Open browser (no headless mode)
      --noClose,    -nc   Don't close browser window when finished (only with no headless mode)
      --timeout,    -t    Navigation timeout (in seconds). Default 30s
      --cookie      -b    Set additional cookies for the page request (you can pass multiple params)
      --header      -H    Set additional headers for the page request (you can pass multiple params)
  
    Examples
      $ page-coverage https://google.com 
      
      $ page-coverage https://google.com --no-headless
      $ page-coverage https://google.com --no-headless --no-close
      
      $ page-coverage https://google.com --timeout 45
      
      $ page-coverage https://google.com --cookie "foo=bar"
      $ page-coverage https://google.com --cookie "foo=bar" "moo=goo; domain=google.com; path=/ secure; httpOnly; expires=123456"
      
      $ page-coverage https://google.com --header "MyHeader: Value"
      $ page-coverage https://google.com --header "MyHeader: Value" --header "MyCustomHeader: some value"
  `,

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
      default: 30,
    },

    cookie: {
      type: 'string',
      alias: 'c',
      default: null,
    },

    header: {
      type: 'string',
      alias: 'H',
      default: null,
    },

    json: {
      type: 'string',
      default: false,
      alias: 'j',
    }
  }
});

if (cli.input.length < 1) {
  cli.showHelp();
}

const [ url ] = cli.input;
const { noHeadless, noClose, timeout, header, cookie } = cli.flags;

const cookies = parseCookieArg(cookie, url);
const headers = parseHeaderArg(header);

openUrl(url, {
  headless: !noHeadless,
  closeBrowser: !noClose,
  timeout,
  headers,
  cookies
});
