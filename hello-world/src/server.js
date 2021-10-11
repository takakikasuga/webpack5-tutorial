const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

// NOTE: https://expressjs.com/ja/starter/static-files.html
app.use("/static", express.static(path.resolve(__dirname, "../dist")));

app.get("/", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/hello-world.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf-8");
  res.send(contentFromHtmlFile);
});

app.listen(9001, () => {
  console.log("Application is runninng http://localhost:9001/");
});
