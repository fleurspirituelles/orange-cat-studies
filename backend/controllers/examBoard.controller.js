const ExamBoard = require("../models/examBoard.model");

async function create(req, res) {
  const data = req.body;
  const examBoard = await ExamBoard.create(data);
  res.status(201).json(examBoard);
}

async function getAll(req, res) {
  const examBoards = await ExamBoard.findAll();
  res.status(200).json(examBoards);
}
async function getById(req, res) {
  const examBoard = await ExamBoard.findByPk(req.params.id);
  if (!examBoard) return res.status(404).end();
  res.status(200).json(examBoard);
}

async function update(req, res) {
  const examBoard = await ExamBoard.findByPk(req.params.id);
  if (!examBoard) return res.status(404).end();
  await examBoard.update(req.body);
  res.status(200).json(examBoard);
}
async function remove(req, res) {
  const examBoard = await ExamBoard.findByPk(req.params.id);
  if (!examBoard) return res.status(404).end();
  await examBoard.destroy();
  res.status(204).end();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};