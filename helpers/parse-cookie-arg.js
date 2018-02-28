const toBoolean = () => true;
const toNumber = value => Number(value);

const booleans = ['httpOnly', 'secure', 'session'];
const numbered = ['expires'];

const camelCase = {
  httponly: 'httpOnly',
  samesite: 'sameSite',
};

const filterName = (name) => {
  name = name.toLowerCase();

  return camelCase[name] ? camelCase[name] : name;
};

const filterValue = (name, value) => {
  if (numbered.includes(name)) {
    return toNumber(value);
  }

  if (booleans.includes(name)) {
    return toBoolean(value);
  }

  return value;
};

const parseCookieArg = (input, url)=> {
  let cookies = null;

  if (!input) {
    return cookies;
  }

  cookies = Array.isArray(input) ? input : [input];

  cookies = cookies.map(cookieArg => {
    const [, name, value, rest] = cookieArg.match(/^([^=]+?)=([^;]+)(.*)$/);
    const cookie = {
      name,
      value
    };

    const options = rest.split(';')
      .filter(Boolean)
      .map(option => option.trim().split('='))
      .map(([name, value]) => {
        name = filterName(name);
        value =  filterValue(name, value);

        return { name, value };
      })
      .reduce((result, { name, value }) => {
        result[name] = value;

        return result;
      }, {});

    if (!options.domain) {
      options.url = url;
    }

    return Object.assign(cookie, options);
  });

  return cookies;
};

module.exports = parseCookieArg;
