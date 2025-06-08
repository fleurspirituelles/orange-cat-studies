import express from "express";
import * as controller from "../controllers/comic.controller.js";
import validateFields from "../middlewares/validateFields.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/user/:id_user", controller.getByUser);
router.get("/date/:comic_date", controller.getByDate);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["id_user", "comic_date", "image_url"]),
  controller.create
);
router.delete("/:id", controller.remove);

export default router;