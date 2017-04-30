const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
  filename: './app/app.css',
  allChunks: true,
});

module.exports = {
  entry: ['./js/index.js', './scss/app.scss'],
  output: {
    filename: './app/bundle.js',
  },

  module: {
    rules: [{
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      }),
    }],
  },

  plugins: [extractSass],
};
