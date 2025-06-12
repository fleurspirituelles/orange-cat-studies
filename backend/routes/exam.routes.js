import { Router } from "express";
import {
  create,
  previewQuestions,
  importQuestions,
} from "../controllers/exam.controller.js";

const router = new Router();

router.post("/", create);
router.post("/preview-questions", previewQuestions);
router.post("/import-questions", importQuestions);

export default router;