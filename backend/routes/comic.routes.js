const express = require("express");
const router = express.Router();
const controller = require("../controllers/comic.controller");
const validateFields = require("../middlewares/validateFields");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["url", "id_user", "id_album"]),
  controller.create
);
router.delete("/:id", controller.remove);

module.exports = router;