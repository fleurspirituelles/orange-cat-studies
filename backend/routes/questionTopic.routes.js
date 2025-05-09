const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionTopic.controller");

router.get("/", controller.getAll);
router.get("/:id_question/:id_topic", controller.getById);
router.post("/", controller.create);
router.delete("/:id_question/:id_topic", controller.remove);

module.exports = router;