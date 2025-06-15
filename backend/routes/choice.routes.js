import express from "express";
import * as controller from "../controllers/choice.controller.js";
import validateFields from "../middlewares/validateFields.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.use(verifyFirebaseToken);

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["id_question", "letter", "description"]),
  controller.create
);
router.put(
  "/:id",
  validateFields(["id_question", "letter", "description"]),
  controller.update
);
router.delete("/:id", controller.remove);

export default router;