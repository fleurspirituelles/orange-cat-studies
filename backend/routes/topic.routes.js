const express = require("express");
const router = express.Router();
const controller = require("../controllers/topic.controller");
const validateFields = require("../middlewares/validateFields");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validateFields(["name"]), controller.create);
router.put("/:id", validateFields(["name"]), controller.update);
router.delete("/:id", controller.remove);

module.exports = router;