/* eslint-disable import/no-extraneous-dependencies */
const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@img': 'src/img',
    '@redux_slices': 'src/redux_slices',
  })(config);

  return config;
};
