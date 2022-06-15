const express = require("express");
const mongoose = require("mongoose");
const { resolve } = require("path");

const publicDir = resolve(__dirname, "public");
const serverPort = 4000;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/test")
  .then(() => console.log("Connected to MongoDB!"))
  .catch(() => console.log("Failed to connect to MongoDB!"));

app.use(express.static(publicDir));
app.get("/", (_req, res) => res.sendFile(`${publicDir}/index.html`));

app.listen(serverPort, () =>
  console.log(`Contact Form served at http://localhost:${serverPort}`)
);
