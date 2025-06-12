import express from "express";
import * as controller from "../controllers/question.controller.js";
import validateFields from "../middlewares/validateFields.js";

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/",
  validateFields(["id_exam", "statement", "answer_key"]),
  controller.create
);
router.put(
  "/:id",
  validateFields(["id_exam", "statement", "answer_key"]),
  controller.update
);
router.delete("/:id", controller.remove);

export default router;