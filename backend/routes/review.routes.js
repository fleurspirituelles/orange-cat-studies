const express = require("express");
const router = express.Router();
const controller = require("../controllers/review.controller");
const validateFields = require("../middlewares/validateFields");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", validateFields(["id_user", "id_question"]), controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;