const express = require("express");
const accidentController = require("../controllers/accidentController");

const router = express.Router();

// GET all accidents
router.get("/accidents", accidentController.getAllAccidents);

// GET an accident by ID
router.get("/accidents/:id", accidentController.getAccidentById);

// GET accidents by location
router.get(
  "/accidents/location/:location",
  accidentController.getAccidentsByLocation
);

// POST create a new accident
router.post("/accidents", accidentController.createAccident);

// Add routes for update and delete operations as needed

module.exports = router;
