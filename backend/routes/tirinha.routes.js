const express = require("express");
const router = express.Router();
const controller = require("../controllers/tirinha.controller");

router.post("/tirinhas", controller.criarTirinha);
router.get("/tirinhas", controller.listarTirinhas);

module.exports = router;