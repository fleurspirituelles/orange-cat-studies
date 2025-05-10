const Exam = require("../models/exam.model");

async function getAll(req, res) {
  try {
    const exams = await Exam.findAll();
    res.status(200).json(exams);
  } catch {
    res.status(500).json({ error: "Failed to retrieve exams." });
  }
}

async function getById(req, res) {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found." });
    res.status(200).json(exam);
  } catch {
    res.status(500).json({ error: "Failed to retrieve exam." });
  }
}

async function create(req, res) {
  try {
    const exam = await Exam.create(req.body);
    res.status(201).json(exam);
  } catch {
    res.status(400).json({ error: "Failed to create exam." });
  }
}

async function update(req, res) {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found." });
    await exam.update(req.body);
    res.status(200).json(exam);
  } catch {
    res.status(400).json({ error: "Failed to update exam." });
  }
}

async function remove(req, res) {
  try {
    const exam = await Exam.findByPk(req.params.id);
    if (!exam) return res.status(404).json({ error: "Exam not found." });
    await exam.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete exam." });
  }
}

module.exports = { getAll, getById, create, update, remove };