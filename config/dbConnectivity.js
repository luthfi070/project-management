const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = async () => {
  mongoose
    .connect(process.env.URL_DB || 3000, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((db) => {
      console.log("tersambung ke db");
    })
    .catch((err) => console.log(err));
};

module.exports = { dbConnection };
