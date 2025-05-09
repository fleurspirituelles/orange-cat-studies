const express = require("express");
const router = express.Router();
const {
  getAllExamBoards,
  createExamBoard,
} = require("../controllers/examBoard.controller");

router.get("/exam-boards", getAllExamBoards);
router.post("/exam-boards", createExamBoard);

module.exports = router;