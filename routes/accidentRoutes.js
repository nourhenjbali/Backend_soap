const express = require("express");
const accidentController = require("../controllers/accidentController");

const router = express.Router();

router.get("/accidents", accidentController.getAllAccidents);

router.get("/accidents/:id", accidentController.getAccidentById);

router.get(
  "/accidents/location/:location",
  accidentController.getAccidentsByLocation
);



module.exports = router;
