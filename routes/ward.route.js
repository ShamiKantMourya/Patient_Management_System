const express = require("express");

const {
  getAllWards,
  getWardById,
  deleteWard,
  editWard,
  addWard,
} = require("../controllers/ward.controller");

const router = express.Router();

//Get all wards
router.route("/").get(getAllWards);
//Add a ward
router.route("/").post(addWard);
//Edit a ward
router.route("/:id").put(editWard);
//Delete a ward
router.route("/:id").delete(deleteWard);
//Get a ward by id
router.route("/:id").get(getWardById);

module.exports = router;
