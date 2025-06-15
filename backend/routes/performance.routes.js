import express from "express";
import * as controller from "../controllers/performance.controller.js";
import validateFields from "../middlewares/validateFields.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.use(verifyFirebaseToken);

router.get("/", controller.getAll);
router.get("/user/:id_user", controller.getByUser);
router.get("/period/:id_user/:start/:end", controller.getByPeriod);
router.get("/:id", controller.getById);

router.post(
  "/",
  validateFields([
    "id_user",
    "correct_answers",
    "total_questions",
    "accuracy",
    "date",
  ]),
  controller.create
);

router.put(
  "/:id",
  validateFields(["correct_answers", "total_questions", "accuracy", "date"]),
  controller.update
);

router.delete("/:id", controller.remove);

export default router;