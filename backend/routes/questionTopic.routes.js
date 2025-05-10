const express = require("express");
const router = express.Router();
const controller = require("../controllers/questionTopic.controller");
const validateFields = require("../middlewares/validateFields");

router.get("/", controller.getAll);
router.get("/:id_question/:id_topic", controller.getById);
router.post(
  "/",
  validateFields(["id_question", "id_topic"]),
  controller.create
);
router.delete("/:id_question/:id_topic", controller.remove);

module.exports = router;