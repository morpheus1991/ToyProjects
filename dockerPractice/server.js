const express = require("express");

const PORT = 8080;
const HOST = "0.0.0.0";

app = express();

app.get("/", (req, res) => {
  res.send("Hellow World");
});

app.listen(PORT);
console.log(`Running On http://${HOST}:${PORT}`);
