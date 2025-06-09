import express from "express";
import * as controller from "../controllers/album.controller.js";
import validateFields from "../middlewares/validateFields.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/user/:id_user", controller.getByUser);
router.get("/month/:id_user/:month/:year", controller.getByMonth);
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

export default router;