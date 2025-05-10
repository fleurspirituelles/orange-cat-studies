const Question = require("../models/question.model");

async function getAll(req, res) {
  try {
    const questions = await Question.findAll();
    res.status(200).json(questions);
  } catch {
    res.status(500).json({ error: "Failed to retrieve questions." });
  }
}

async function getById(req, res) {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question)
      return res.status(404).json({ error: "Question not found." });
    res.status(200).json(question);
  } catch {
    res.status(500).json({ error: "Failed to retrieve question." });
  }
}

async function create(req, res) {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch {
    res.status(400).json({ error: "Failed to create question." });
  }
}

async function update(req, res) {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question)
      return res.status(404).json({ error: "Question not found." });
    await question.update(req.body);
    res.status(200).json(question);
  } catch {
    res.status(400).json({ error: "Failed to update question." });
  }
}

async function remove(req, res) {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question)
      return res.status(404).json({ error: "Question not found." });
    await question.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete question." });
  }
}

module.exports = { getAll, getById, create, update, remove };