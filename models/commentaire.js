const mongoose = require("mongoose");

const commentaireSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Utilisateur",
    required: true,
  },
  contenu: {
    type: String,
    required: true,
  },
  localisation: {
    type: String,
    required: true,
  },
});

const Commentaire = mongoose.model("Commentaire", commentaireSchema);

module.exports = Commentaire;
