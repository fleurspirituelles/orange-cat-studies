const ExamBoard = require("../models/examBoard.model");

async function getAllExamBoards(req, res) {
  try {
    const boards = await ExamBoard.findAll();
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve exam boards." });
  }
}

async function createExamBoard(req, res) {
  try {
    const { name } = req.body;
    const board = await ExamBoard.create({ name });
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: "Failed to create exam board." });
  }
}

module.exports = {
  getAllExamBoards,
  createExamBoard,
};