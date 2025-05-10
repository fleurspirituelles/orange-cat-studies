const express = require("express");
const router = express.Router();
const controller = require("../controllers/examBoard.controller");
const validateFields = require("../middlewares/validateFields");

router.get("/", controller.getAll);
router.post("/", validateFields(["name"]), controller.create);

module.exports = router;