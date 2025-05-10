const express = require("express");
const router = express.Router();
const controller = require("../controllers/album.controller");
const validateFields = require("../middlewares/validateFields");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["id_user", "month", "year", "total_days"]),
  controller.create
);
router.put(
  "/:id",
  validateFields(["id_user", "month", "year", "total_days"]),
  controller.update
);
router.delete("/:id", controller.remove);

module.exports = router;