const mongoose = require("mongoose");
const fs = require("fs");

const jsonData = fs.readFileSync("./data/ward.json");
const wardData = JSON.parse(jsonData);

const Ward = require("../models/ward.model");

// const seedWardDatabase = async () => {
//   try {
//     for (const ward of wardData) {
//       const newWard = new Ward(ward);
//       await newWard.save();
//       console.log(`Ward ${newWard.wardNumber} seeded`);
//     }
//     console.log("Ward database seeded successfully");
//   } catch (error) {
//     console.log("Error seeding ward database:", error);
//   } finally {
//     mongoose.disconnect();
//   }
// };

// seedWardDatabase();

exports.getAllWards = async (req, res) => {
  try {
    const wards = await Ward.find({});
    res.status(200).json({
      success: true,
      ward: wards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.addWard = async (req, res) => {
  try {
    const data = req.body;
    const newWard = new Ward(data);
    const savedWard = await newWard.save();
    res.status(201).json({
      success: true,
      message: "Ward added successfully",
      ward: savedWard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.editWard = async (req, res) => {
  try {
    const wardId = req.params.id;
    // const ward = await Ward.findById(wardId);
    const updatedData = req.body;
    const updatedWard = await Ward.findByIdAndUpdate(wardId, updatedData, {
      new: true,
    });
    await updatedWard.save();
    res.status(200).json({
      success: true,
      message: "Ward updated successfully",
      ward: updatedWard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteWard = async (req, res) => {
  try {
    const wardId = req.params.id;
    const ward = await Ward.findById(wardId);
    const deletedWard = await Ward.findByIdAndDelete(wardId);
    // await ward.save();
    res.status(200).json({
      success: true,
      message: "Ward deleted successfully",
      ward: deletedWard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getWardById = async (req, res) => {
  try {
    const wardId = req.params.id;
    const ward = await Ward.findById(wardId);
    res.status(200).json({
      success: true,
      ward: ward,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
