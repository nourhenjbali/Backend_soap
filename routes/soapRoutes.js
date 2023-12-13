// routes/soapRoutes.js
const express = require("express");
const router = express.Router();
const traficController = require("../Controllers/TraficController");

router.post("/getAllInfosTrafic", async (req, res) => {
  try {
    const response = await traficController.getAllInfosTrafic(req.body);
    res.header("Content-Type", "application/json");
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/getInfoTraficById", async (req, res) => {
  try {
    const response = await traficController.getInfoTraficById(req.body);
    res.header("Content-Type", "application/json");
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/createInfoTrafic", async (req, res) => {
  try {
    const response = await traficController.createInfoTrafic(req.body);
    res.header("Content-Type", "application/json");
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/updateInfoTrafic", async (req, res) => {
  try {
    const response = await traficController.updateInfoTrafic(req.body);
    res.header("Content-Type", "application/json");
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/deleteInfoTrafic", async (req, res) => {
  try {
    const response = await traficController.deleteInfoTrafic(req.body);
    res.header("Content-Type", "application/json");
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/searchInfoTraficByLocation/:location", async (req, res) => {
  try {
    const response = await traficController.searchInfoTraficByLocation(
      req.params
    );
    res.header("Content-Type", "application/json");
    res.send(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
