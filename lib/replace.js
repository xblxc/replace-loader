var LoaderUtils = require('loader-utils');
var getOptions = require('./getOptions');

module.exports = function (source) {
  var options = getOptions(this);
  if (typeof options.search === 'string') {
    options.search = new RegExp(options.search, 'g');
  } else if (options.search instanceof RegExp && !options.search.global) {
    options.search = new RegExp(options.search, 'g' + (options.flags || ''));
  }
  var newSource = source.replace(options.search, options.replace);
  return newSource;
}