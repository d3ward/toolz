const config = require("./webpack.config");
const {
  merge
} = require("webpack-merge");
const paths = require("./paths");

const glob = require("glob-all");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
module.exports = merge(config, {
  mode: "production",
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.ejs$/i,
        use: ['html-loader', 'template-ejs-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader, // extract css from commonjs
          "css-loader", // turn css into commonjs
          "sass-loader", // turn scss into css
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync(`${paths.src}/**/*`,  { nodir: true }),
    }),
  ]
});