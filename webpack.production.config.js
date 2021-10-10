const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "hello-world": "./src/hello-world.js",
    "webpack-image": "./src/webpackImage.js",
  },
  output: {
    // [name] = entryポイントのキー名称を指す。
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  // NOTE: https://webpack.js.org/configuration/mode/
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(png|jpeg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024, // 3kb
          },
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
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
      // chunks = entryポイントのキー名称を指す。
      // NOTE: 出力するHTMLファイルの内容をエントリーポイントでimportしている内容に依存する形で出力する。
      chunks: ["hello-world"],
      title: "Hello World!",
      template: "./src/page-template.hbs",
      // filename: 'subfolder/custom_filename.html',
      description: "Hello World",
      minify: false,
    }),
    new HtmlWebpackPlugin({
      filename: "webpack-image.html",
      // chunks = entryポイントのキー名称を指す。
      // NOTE: 出力するHTMLファイルの内容をエントリーポイントでimportしている内容に依存する形で出力する。
      chunks: ["webpack-image"],
      title: "Webpack Image",
      template: "./src/page-template.hbs",
      // filename: 'subfolder/custom_filename.html',
      description: "Webpack Image description",
      minify: false,
    }),
  ],
};
