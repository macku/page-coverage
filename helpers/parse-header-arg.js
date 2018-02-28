const parseHeaderArg = (input) => {
  let headers = null;

  if (!input) {
    return headers;
  }

  headers = Array.isArray(input) ? input : [input];

  headers = headers
    .map(headerArg => {
      const [, name, value] = headerArg.match(/^([^:]+)\s?:\s?(.+)$/);

      return { name, value };
    })
    .reduce((result, { name, value }) => {
      result[name] = value;

      return result;
    }, {});

  return headers;
};

module.exports = parseHeaderArg;
