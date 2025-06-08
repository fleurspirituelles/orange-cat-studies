import express from "express";
import * as controller from "../controllers/exam.controller.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post(
  "/upload-questions",
  upload.fields([
    { name: "examPdf", maxCount: 1 },
    { name: "answerPdf", maxCount: 1 },
  ]),
  controller.uploadQuestions
);

export default router;