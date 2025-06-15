import express from "express";
import {
  create,
  listExams,
  previewQuestions,
  previewPdfUpload,
  importQuestions,
  getById,
  update,
  remove,
} from "../controllers/exam.controller.js";
import validateFields from "../middlewares/validateFields.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.use(verifyFirebaseToken);

router.get("/", listExams);
router.get("/:id", getById);
router.post(
  "/",
  validateFields(["exam_name", "year", "board", "position", "level"]),
  create
);
router.put(
  "/:id",
  validateFields(["exam_name", "year", "board", "position", "level"]),
  update
);
router.delete("/:id", remove);

router.post("/preview-questions", previewQuestions);
router.post("/preview-questions-pdf", previewPdfUpload);
router.post("/import-questions", importQuestions);

export default router;