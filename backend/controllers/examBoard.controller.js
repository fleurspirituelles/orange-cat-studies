const ExamBoard = require("../models/examBoard.model");

async function getAll(req, res) {
  try {
    const examBoards = await ExamBoard.findAll();
    res.status(200).json(examBoards);
  } catch {
    res.status(500).json({ error: "Failed to retrieve exam boards." });
  }
}

async function getById(req, res) {
  try {
    const examBoard = await ExamBoard.findByPk(req.params.id);
    if (!examBoard)
      return res.status(404).json({ error: "Exam board not found." });
    res.status(200).json(examBoard);
  } catch {
    res.status(500).json({ error: "Failed to retrieve exam board." });
  }
}

async function create(req, res) {
  try {
    const examBoard = await ExamBoard.create(req.body);
    res.status(201).json(examBoard);
  } catch {
    res.status(400).json({ error: "Failed to create exam board." });
  }
}

async function update(req, res) {
  try {
    const examBoard = await ExamBoard.findByPk(req.params.id);
    if (!examBoard)
      return res.status(404).json({ error: "Exam board not found." });
    await examBoard.update(req.body);
    res.status(200).json(examBoard);
  } catch {
    res.status(400).json({ error: "Failed to update exam board." });
  }
}

async function remove(req, res) {
  try {
    const examBoard = await ExamBoard.findByPk(req.params.id);
    if (!examBoard)
      return res.status(404).json({ error: "Exam board not found." });
    await examBoard.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete exam board." });
  }
}

module.exports = { getAll, getById, create, update, remove };