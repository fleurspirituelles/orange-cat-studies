import express from "express";
import * as controller from "../controllers/album.controller.js";
import validateFields from "../middlewares/validateFields.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.use(verifyFirebaseToken);

router.get("/", controller.getAll);
router.get("/my", controller.getByUser);
router.get("/month/:month/:year", controller.getByMonth);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["month", "year", "total_days"]),
  controller.create
);
router.put(
  "/:id",
  validateFields(["month", "year", "total_days"]),
  controller.update
);
router.delete("/:id", controller.remove);

export default router;