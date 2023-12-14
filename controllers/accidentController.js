const Accident = require("../models/accidentModel");

const accidentController = {
  getAllAccidents: async function (req, res) {
    try {
      const accidents = await Accident.find();
      res.json(accidents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAccidentById: async function (req, res) {
    const accidentId = req.params.id;
    try {
      const accident = await Accident.findById(accidentId);
      if (!accident) {
        return res.status(404).json({ message: "Accident not found" });
      }
      res.json(accident);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createAccident: async function (req, res) {
    const { id, link, title, description, location } = req.body;
    try {
      const newAccident = new Accident({
        id,
        link,
        title,
        description,
        location,
      });
      const savedAccident = await newAccident.save();
      res.json(savedAccident);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAccidentsByLocation: async function (req, res) {
    const location = req.params.location;
    try {
      const accidents = await Accident.find({ location: location });
      res.json(accidents);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = accidentController;
