const mongoose = require("mongoose");

const accidentSchema = new mongoose.Schema({
  id: Number,
  link: String,
  title: String,
  description: String,
  location: String,
});

const Accident = mongoose.model("Accident", accidentSchema);

module.exports = Accident;
