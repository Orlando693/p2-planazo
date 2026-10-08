const express = require("express");
const path = require("path");
const planes = require("./planes");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/api/planes", planes);

app.listen(3000, function () {
  console.log("Planazo disponible en http://localhost:3000/login.html");
});
