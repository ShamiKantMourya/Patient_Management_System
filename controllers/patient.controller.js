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
    if (patients) {
      res.status(200).json({
        success: true,
        patient: patients,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Patient not found",
      });
    }
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
    if (savedPatient) {
      res.status(201).json({
        success: true,
        message: "Patient added successfully",
        patient: savedPatient,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Patient not added",
      });
    }
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
    const updatedData = req.body;
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updatedData,
      { new: true },
    );
    if (updatedPatient) {
      res.status(200).json({
        success: true,
        message: "Patient updated successfully",
        patient: updatedPatient,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Patient not updated",
      });
    }
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
    if (deletedPatient) {
      res.status(200).json({
        success: true,
        message: "Patient deleted successfully",
        patient: deletedPatient,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Patient not deleted",
      });
    }
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
    if (patient) {
      res.status(200).json({
        success: true,
        patient: patient,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Patient not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
