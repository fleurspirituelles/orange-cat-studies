import express from "express";
import AnswerController from "../controllers/answer.controller.js";

const router = express.Router();

router.get("/", AnswerController.getAll);
router.get("/:id", AnswerController.getById);
router.post("/", AnswerController.create);
router.put("/:id", AnswerController.update);
router.delete("/:id", AnswerController.remove);

export default router;