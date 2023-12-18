const express = require("express");
const router = express.Router();
const utilisateursController = require("../controllers/utilisateursController");

router.get("/", utilisateursController.getAllUtilisateurs);
router.get("/:id", utilisateursController.getUtilisateurById); 
router.post("/", utilisateursController.createUtilisateur);
router.put("/:id", utilisateursController.updateUtilisateur); 
router.delete("/:id", utilisateursController.deleteUtilisateur); 

module.exports = router;

