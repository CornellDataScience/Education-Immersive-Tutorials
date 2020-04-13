const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const entry = require('webpack-glob-entry')

const config = {
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  entry: entry(__dirname + "/src/**/styles/**/*.css"),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "@teamsupercell/typings-for-css-modules-loader" },
          { loader: "css-loader", options: { modules: true } }
        ]
      }
    ]
  },
};
module.exports = config;
