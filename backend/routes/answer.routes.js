import express from "express";
import * as controller from "../controllers/answer.controller.js";
import validateFields from "../middlewares/validateFields.js";

const router = express.Router();

router.get("/count/:id_user/:date", controller.countByUserDate);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["id_user", "id_question", "selected_choice"]),
  controller.create
);
router.put(
  "/:id",
  validateFields(["id_user", "id_question", "selected_choice"]),
  controller.update
);
router.delete("/:id", controller.remove);

export default router;