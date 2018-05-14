var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;
var webpack = require('webpack');
var memoryfs = require('memory-fs');

var compile = (entry_file, loaderConfig, callback) => {
  var compiler = webpack({
    mode: 'development',
    entry: path.join(__dirname, 'source', entry_file),
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        loaderConfig
      ]
    }
  });
  compiler.outputFileSystem = new memoryfs();
  compiler.run(callback);
};

describe('Webpack replace-loader Test:', () => {

  it('should replace with all string search', done => {
    var replaceOpts = {
      search: 'API',
      replace: 'http://example.com'
    };
    compile(
      'entry1.js',
      {
        test: /\.js$/,
        loader: path.resolve(__dirname, '../index.js'),
        options: replaceOpts,
      },
      (error, stats) => {
        expect(error).to.equal(null);
        var contents = stats.toJson().modules[0].source;
        expect(contents).to.not.include(replaceOpts.search);
        expect(contents).to.include(replaceOpts.replace);
        done();
      }
    )
  });

  [
    ['should replace with all reg search (no flags \'g\')', /API\(([^\)]+)\)/],
    ['should replace with all reg search (has flags \'g\')', /API\(([^\)]+)\)/g],
  ].forEach(args => {
    it(args[0], done => {
      var replaceOpts = {
        search: args[1],
        replace: (searchStr, path) => {
          return 'http://example.com/' + path + '.json';
        }
      };
      compile(
        'entry2.js',
        {
          test: /\.js$/,
          loader: path.resolve(__dirname, '../index.js'),
          options: replaceOpts,
        },
        (error, stats) => {
          expect(error).to.equal(null);
          var contents = stats.toJson().modules[0].source;
          expect(contents).to.not.include('API');
          expect(contents).to.include('http://example.com/xxx/xx1.json');
          expect(contents).to.include('http://example.com/xxx/xx2.json');
          done();
        }
      )
    });
  })

});
