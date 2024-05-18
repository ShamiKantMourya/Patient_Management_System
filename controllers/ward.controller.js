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
    if (wards) {
      res.status(200).json({
        success: true,
        ward: wards,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Ward not found",
      });
    }
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
    if (savedWard) {
      res.status(201).json({
        success: true,
        message: "Ward added successfully",
        ward: savedWard,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Ward not added",
      });
    }
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
    const ward = await Ward.findById(wardId);
    const updatedData = req.body;
    const updatedWard = await Ward.findByIdAndUpdate(wardId, updatedData, {
      new: true,
    });
    await ward.save();
    if (updatedWard) {
      res.status(200).json({
        success: true,
        message: "Ward updated successfully",
        ward: updatedWard,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Ward not updated",
      });
    }
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
    if (deletedWard) {
      res.status(200).json({
        success: true,
        message: "Ward deleted successfully",
        ward: deletedWard,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Ward not deleted",
      });
    }
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
    if (ward) {
      res.status(200).json({
        success: true,
        ward: ward,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Ward not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
