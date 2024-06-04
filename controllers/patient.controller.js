const mongoose = require("mongoose");
const fs = require("fs");

const jsonData = fs.readFileSync("./data/patient.json");
const patientData = JSON.parse(jsonData);

const Patient = require("../models/patient.model");

const seedPatientDatabase = async () => {
  try {
    for (const patient of patientData) {
      const newPatient = new Patient(patient);
      await newPatient.save();
      console.log(`Patient ${newPatient.name} seeded`);
    }
    console.log("Patient database seeded successfully");
  } catch (error) {
    console.log("Error seeding patient database:", error);
  } finally {
    mongoose.disconnect();
  }
};

// seedPatientDatabase();

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate({
      path: "ward",
      select: "wardNumber capacity specialization",
    });
    res.status(200).json({
      success: true,
      patient: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addPatient = async (req, res) => {
  try {
    const data = req.body;
    const newPatient = new Patient(data);
    const savedPatient = await newPatient.save();
    res.status(201).json({
      success: true,
      message: "Patient added successfully",
      patient: savedPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editPatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const patient = await Patient.findById(patientId);
    const updatedData = req.body;
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updatedData,
      { new: true },
    );
    await patient.save();
    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      patient: updatedPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const patientId = req.params.id;
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
      patient: deletedPatient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getPatientByName = async (req, res) => {
  try {
    const patientName = req.params.name;
    const patient = await Patient.findOne({ name: patientName });
    res.status(200).json({
      success: true,
      patient: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
