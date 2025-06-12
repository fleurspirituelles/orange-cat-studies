import { Router } from "express";
import {
  create,
  previewQuestions,
  previewPdfUpload,
  importQuestions,
} from "../controllers/exam.controller.js";

const router = new Router();

router.post("/", create);
router.post("/preview-questions", previewQuestions);
router.post("/preview-questions-pdf", previewPdfUpload);
router.post("/import-questions", importQuestions);

export default router;