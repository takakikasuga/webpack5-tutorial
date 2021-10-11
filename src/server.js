const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

// NOTE: https://expressjs.com/ja/starter/static-files.html
app.use("/static", express.static(path.resolve(__dirname, "../dist")));

app.get("/hello-world", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/hello-world.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.get("/webpack-image", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/webpack-image.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.listen(3000, () => {
  console.log("Application is runninng http://localhost:3000/");
});
