const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { dataBase } = require("./db");
const ward = require("./routes/ward.route");
const patient = require("./routes/patient.route");

const app = express();

//Middlewares
app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

//DataBase Connected
dataBase();

//Routes
app.get("/", (req, res) => {
  res.send("Patient Management System");
});

app.use("/api/v1/wards", ward);
app.use("/api/v1/patients", patient);

app.use("/", (err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.use("/", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
