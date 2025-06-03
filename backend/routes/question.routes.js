import express from "express";
import QuestionController from "../controllers/question.controller.js";

const router = express.Router();

router.get("/", QuestionController.getAll);
router.get("/:id", QuestionController.getById);
router.post("/", QuestionController.create);
router.put("/:id", QuestionController.update);
router.delete("/:id", QuestionController.remove);

export default router;