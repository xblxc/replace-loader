var LoaderUtils = require('loader-utils');
var validateOptions = require('schema-utils');
var package = require('../package.json');

var optionsSchema = {
  type: 'object',
  properties: {
    search: {
      anyOf: [
        { type: 'string' },
        { instanceof: 'RegExp' }
      ]
    },
    replace: {
      anyOf: [
        { type: 'string' },
        { instanceof: 'Function' }
      ]
    },
  },
};

module.exports = function (config) {
  var options = LoaderUtils.getOptions(config);
  validateOptions(optionsSchema, options, package.name);
  return options;
}