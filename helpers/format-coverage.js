const chalk = require('chalk');
const shortenUrl = require('shorten-url');
const byteSize = require('byte-size');
const Table = require('cli-table');

const { urlColSize } = require('./settings');
const { progressBar } = require('./formatters');

const sumRangeUsage = ranges => {
  return ranges.reduce((total, range) => {
    return total + range.end - range.start - 1;
  }, 0);
};

const getTotalUsage = (coverage) => {
  const totalUsage = coverage.reduce((results, { totalBytes, usedBytesTotal, unusedBytesTotal }) => {
    results.totalBytes += totalBytes;
    results.usedBytesTotal += usedBytesTotal;
    results.unusedBytesTotal += unusedBytesTotal;

    return results;
  }, {
      totalBytes: 0,
      usedBytesTotal: 0,
      unusedBytesTotal: 0,
  });

  const { totalBytes, unusedBytesTotal } = totalUsage;
  const unusedPercentage = totalBytes ? (unusedBytesTotal * 100 / totalBytes) : 0;
  const usedPercentage = 100 - unusedPercentage;

  return {
    ...totalUsage,
    usedPercentage,
    unusedPercentage,
  };
};

const formatCoverageResult = (coverage) => (
  coverage
    .map(({ url, text, ranges, type }) => {
      const usedBytesTotal = sumRangeUsage(ranges);
      const totalBytes = text.length;
      const unusedBytesTotal = totalBytes - usedBytesTotal;

      const unusedPercentage = totalBytes ? (unusedBytesTotal * 100 / totalBytes) : 0;
      const usedPercentage = 100 - unusedPercentage;

      return {
        url,
        type,
        totalBytes,
        usedBytesTotal,
        unusedBytesTotal,
        usedPercentage,
        unusedPercentage
      };
    })
    .sort(({ usedPercentage: A }, { usedPercentage: B }) => {
      return B - A;
    })
);

const formatCoverage = (url, pageUrl, coverage, json) => {
  const result = formatCoverageResult(coverage);

  return json ? formatCoverageAsJson(url, pageUrl, result) : prettyFormat(url, pageUrl, result);
};

const formatCoverageAsJson = (url, pageUrl, coverage) => {
  const totalUsage = getTotalUsage(coverage);
  const isRedirected = url !== pageUrl;

  const result = {
    url,
    redirectedUrl: isRedirected ? pageUrl : null,
    coverage,
    totalUsage,
  };

  return JSON.stringify(result, null, "  ");
};

const prettyFormat = (url, pageUrl, coverage) => {
  console.log(`Coverage report for page: ${url}`);

  const isRedirected = url !== pageUrl;

  if (isRedirected) {
    console.log(`Redirected to: ${pageUrl}`);
  }

  console.log();

  const prettyTable = formatCoverageAsTable(pageUrl, coverage);

  const { usedBytesTotal, usedPercentage, totalBytes } = getTotalUsage(coverage);
  const prettyTotal = `Total ${chalk.green.bold(byteSize(usedBytesTotal))} ${chalk.dim(`(${usedPercentage.toFixed(2)}%)`)} of ${chalk.blue.bold(byteSize(totalBytes))} assets bytes are used one the page`;

  return `${prettyTable}\n\n${prettyTotal}\n`;
};

// TODO: Create link
const getAssetLabel = (pageUrl, url) => {
  return pageUrl === url ? '(inline code)' : shortenUrl(url, urlColSize);
};

const formatCoverageAsTable = (pageUrl, coverage) => {
  const table = new Table({
    head: (['Asset URL', 'Type', 'Total Size', 'Used bytes', 'Usage'].map(label => chalk.blue.bold(label))),
    colAligns: ['left', 'left', 'right', 'right', 'left']
  });

  coverage.forEach(({ url, type, totalBytes, usedBytesTotal, usedPercentage }) => {
    const totalBytesFormatted = chalk.bold(byteSize(totalBytes));
    const usedBytesFormatted = `${chalk.green.bold(byteSize(usedBytesTotal))} ${chalk.dim(`(${usedPercentage.toFixed(2)}%)`)}`;
    const label = getAssetLabel(pageUrl, url);

    table.push([
      label,
      type,
      totalBytesFormatted,
      usedBytesFormatted,
      progressBar(usedPercentage),
    ]);
  });

  return table.toString();
};

module.exports = formatCoverage ;
