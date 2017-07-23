/* @flow */

const config = {
  bodyParser: {
    json: {
      limit: '100kb',
    },
    urlencoded: {
      extended: false,
    },
  },
};

export { config };
