const webpack = require('webpack');
const entry = require('webpack-glob-entry');
const { TypedCssModulesPlugin } = require('typed-css-modules-webpack-plugin');
const config = {
  entry: __dirname + "/src/styles/main.css", // dummy entrypoint -- could be any css file
  plugins: [
    new TypedCssModulesPlugin({
      globPattern: __dirname + "/src/**/styles/**/*.css"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["css-loader"] // dummy, result isn't used
      }
    ]
  },
  performance: { hints: false }
};
module.exports = config;
