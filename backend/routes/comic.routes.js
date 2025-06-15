import express from "express";
import * as controller from "../controllers/comic.controller.js";
import validateFields from "../middlewares/validateFields.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.use(verifyFirebaseToken);

router.get("/", controller.getAll);
router.get("/user/:id_user", controller.getByUser);
router.get("/user/:id_user/date/:comic_date", controller.getByDate);
router.get("/date/:comic_date", controller.fetchImage);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["comic_date", "image_url"]),
  controller.create
);
router.delete("/:id", controller.remove);

export default router;