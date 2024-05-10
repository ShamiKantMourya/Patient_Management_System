const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Non-binary"],
      default: "Male",
    },
    medicalHistory: {
      type: [String],
      default: ["None"],
    },
    contact: {
      type: Number,
      required: true,
    },
    ward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ward",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
