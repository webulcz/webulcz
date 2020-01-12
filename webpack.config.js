const path = require('path');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      './js/src/app.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'app.min.js',
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
           presets: ['env', 'stage-0']
        }
    }]
  }
}