const express = require("express");

const {
  getAllPatients,
  addPatient,
  editPatient,
  deletePatient,
  getPatientByName,
} = require("../controllers/patient.controller");

const router = express.Router();

//Get all patients
router.route("/").get(getAllPatients);
//Add a patient
router.route("/").post(addPatient);
//Edit a patient
router.route("/:id").post(editPatient);
//Delete a patient
router.route("/:id").delete(deletePatient);
//Get a patient by name
router.route("/:name").get(getPatientByName);

module.exports = router;
