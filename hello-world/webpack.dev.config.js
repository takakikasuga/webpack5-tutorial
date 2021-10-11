const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
console.log("path.join(__dirname, 'dist')", path.join(__dirname, "dist"));
console.log(
  "path.resolve(__dirname, './dist')",
  path.resolve(__dirname, "./dist")
);
console.log("process.cwd()", process.cwd());

module.exports = {
  entry: "./src/hello-world.js",
  output: {
    // [name] = entryポイントのキー名称を指す。
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
  },
  // NOTE: https://webpack.js.org/configuration/mode/
  mode: "development",
  // NOTE: https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 9001,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    // NOTE: https://webpack.js.org/configuration/dev-server/#devserverdevmiddleware
    devMiddleware: {
      index: "hello-world.html",
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
