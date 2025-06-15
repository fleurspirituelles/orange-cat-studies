import express from "express";
import {
  create,
  previewQuestions,
  previewPdfUpload,
  importQuestions,
} from "../controllers/exam.controller.js";
import validateFields from "../middlewares/validateFields.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.use(verifyFirebaseToken);

router.post(
  "/",
  validateFields(["name", "year", "exam_board", "position", "level"]),
  create
);
router.post("/preview-questions", previewQuestions);
router.post("/preview-questions-pdf", previewPdfUpload);
router.post("/import-questions", importQuestions);

export default router;