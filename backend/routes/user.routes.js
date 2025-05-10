const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const validateFields = require("../middlewares/validateFields");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["name", "email", "password"]),
  controller.create
);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;