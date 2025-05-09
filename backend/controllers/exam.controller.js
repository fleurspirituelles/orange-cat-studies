const Exam = require("../models/exam.model");

async function createExam(req, res) {
  const data = req.body;
  const exam = await Exam.create(data);
  res.status(201).json(exam);
}

async function getAllExams(req, res) {
  const exams = await Exam.findAll();
  res.status(200).json(exams);
}

async function getExamById(req, res) {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).end();
  res.status(200).json(exam);
}

async function updateExam(req, res) {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).end();
  await exam.update(req.body);
  res.status(200).json(exam);
}

async function deleteExam(req, res) {
  const exam = await Exam.findByPk(req.params.id);
  if (!exam) return res.status(404).end();
  await exam.destroy();
  res.status(204).end();
}

module.exports = {
  createExam,
  getAllExams,
  getExamById,
  updateExam,
  deleteExam,
};