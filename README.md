page-coverage
=============

![Coverage Demo](images/coverage.gif)

[![NPM version](https://badge.fury.io/js/page-coverage.svg)](https://www.npmjs.com/package/page-coverage)
[![node](https://img.shields.io/node/v/page-coverage.svg)](https://www.npmjs.com/package/page-coverage)
[![dependencies Status](https://david-dm.org/macku/page-coverage/status.svg)](https://david-dm.org/macku/page-coverage)
[![devDependencies Status](https://david-dm.org/macku/page-coverage/dev-status.svg)](https://david-dm.org/macku/page-coverage?type=dev)
[![peerDependencies Status](https://david-dm.org/macku/page-coverage/peer-status.svg)](https://david-dm.org/macku/page-coverage?type=peer)

Collect the information about JS and CSS **code overage** and usage from any page with a little help of [Puppeteer](https://github.com/GoogleChrome/puppeteer)

Installation
============

You can install the plugin globally using [**NPM**](https://www.npmjs.com):

```bash
npm install page-coverage -g
```

or by [**Yarn**](https://yarnpkg.com/):

```bash
yarn global add page-coverage 
```

How to use it?
==============

Open your favourite terminal and type command:

```bash
page-coverage <<url>>
```

ex.

```bash
page-coverage http://gtihub.com/macku/page-coverage
```

Then wait for the tool to finish collecting coverage.

In the results table, you can find the information about all of the downloaded **JS** and **CSS** files from the page.
What is most important you can read the usage of each file.
 The **green** bar means how much code from the file content was actually executed on the page.
