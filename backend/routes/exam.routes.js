import express from "express";
import ExamController from "../controllers/exam.controller.js";

const router = express.Router();

router.get("/", ExamController.getAll);
router.get("/:id", ExamController.getById);
router.post("/", ExamController.create);
router.put("/:id", ExamController.update);
router.delete("/:id", ExamController.remove);

export default router;