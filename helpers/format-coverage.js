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

const formatCoverageResult = (coverage) => (
  coverage.map(({ url, text, ranges, type }) => {
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
);

const formatCoverage = (url, coverage, json) => {
  const result = formatCoverageResult(coverage);

  return json ? formatCoverageAsJson(url, result) : formatCoverageAsTable(result);
};

const formatCoverageAsJson = (url, coverage) => {
  return JSON.stringify({ url, coverage });
};

const formatCoverageAsTable = (coverage) => {
  const table = new Table({
    head: (['Asset URL', 'Type', 'Total Size', 'Used bytes', 'Usage'].map(label => chalk.blue.bold(label))),
    colAligns: ['left', 'left', 'right', 'right', 'left']
  });

  coverage.forEach(({ url, type, totalBytes, usedBytesTotal, usedPercentage }) => {
    const totalBytesFormatted = byteSize(totalBytes);
    const usedBytesFormatted = `${chalk.green(byteSize(usedBytesTotal))} (${usedPercentage.toFixed(2)}%)`;

    table.push([
      shortenUrl(url, urlColSize),
      type,
      totalBytesFormatted,
      usedBytesFormatted,
      progressBar(usedPercentage),
    ]);
  });

  return table.toString();
};

module.exports = formatCoverage ;
