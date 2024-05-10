const { error } = require("console");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URL;

exports.dataBase = () => {
  mongoose
    .connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DataBase Connected"))
    .catch((error) => console.error("Error: ", error));
};
