const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/dbConnectivity");
const ErrorHandling = require("./helper/errorHelper");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.dbConnection();

app.get("/", function (req, res) {
  res.send("Welcome to Project Management");
});
app.use("/users", require("./user/userController"));
app.use("/projects", require("./project/projectController"));
app.use("/tasks", require("./task/taskController"));

app.use(ErrorHandling);

app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
  console.log("app connected");
});
