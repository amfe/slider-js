var webpack = require('webpack');
var pkg = require('./package.json');

var sourceMapPlugin = new webpack.SourceMapDevToolPlugin({
  test: /\.js|less$/
})

module.exports = {
  entry: ['./src/index.less', './src/index.js'],
  output: {
    path: './samples',
    filename: 'bundle.js',
    library: 'slider',
    libraryTarget: 'this'
  },
  module: {
    loaders: [
      { test: /\.js|es6$/, loader: 'babel' },
      { test: /\.less/, loader: 'style!css!less' }
    ]
  },
  plugins: [sourceMapPlugin]
}
