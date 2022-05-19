require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT;

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(PORT);
