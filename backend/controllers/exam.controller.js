const Exam = require("../models/exam.model");

async function create(req, res) {
  const data = req.body;
  const exam = await Exam.create(data);
  res.status(201).json(exam);
}

async function getAll(req, res) {
  const exams = await Exam.findAll();
  res.status(200).json(exams);
}

async function getById(req, res) {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).end();
  res.status(200).json(exam);
}

async function update(req, res) {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).end();
  await exam.update(req.body);
  res.status(200).json(exam);
}

async function remove(req, res) {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).end();
  await exam.destroy();
  res.status(204).end();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};