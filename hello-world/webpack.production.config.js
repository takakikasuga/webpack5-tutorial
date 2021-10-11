const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/hello-world.js",
  output: {
    // [name] = entryポイントのキー名称を指す。
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/static/",
  },
  // NOTE: https://webpack.js.org/configuration/mode/
  mode: "production",
  optimization: {
    // NOTE: https://webpack.js.org/plugins/split-chunks-plugin/
    splitChunks: {
      // 依存関係のモジュールをキャッシュ化する。
      chunks: "all",
      // 最小サイズを30kbにする。
      minSize: 3000,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // [name] = entryポイントのキー名称を指す。
      filename: "[name].[contenthash].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*",
        // NOTE: 絶対パスでルートディレクトリ以外で削除するフォルダ及びファイル群をきめる。
        path.join(process.cwd(), "build/**/*"),
      ],
    }),
    new HtmlWebpackPlugin({
      filename: "hello-world.html",
      title: "Hello World!",
      template: "./src/page-template.hbs",
      // filename: 'subfolder/custom_filename.html',
      description: "Hello World",
      minify: false,
    }),
  ],
};
