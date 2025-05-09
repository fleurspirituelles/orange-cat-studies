const express = require("express");
const router = express.Router();
const controller = require("../controllers/exam.controller");

router.post("/", controller.createExam);
router.get("/", controller.getAllExams);
router.get("/:id", controller.getExamById);
router.put("/:id", controller.updateExam);
router.delete("/:id", controller.deleteExam);

module.exports = router;