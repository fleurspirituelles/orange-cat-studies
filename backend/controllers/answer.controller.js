const Answer = require("../models/answer.model");

async function getAll(req, res) {
  try {
    const answers = await Answer.findAll();
    res.status(200).json(answers);
  } catch {
    res.status(500).json({ error: "Failed to retrieve answers." });
  }
}

async function getById(req, res) {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found." });
    res.status(200).json(answer);
  } catch {
    res.status(500).json({ error: "Failed to retrieve answer." });
  }
}

async function create(req, res) {
  try {
    const answer = await Answer.create(req.body);
    res.status(201).json(answer);
  } catch {
    res.status(400).json({ error: "Failed to create answer." });
  }
}

async function update(req, res) {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found." });
    await answer.update(req.body);
    res.status(200).json(answer);
  } catch {
    res.status(400).json({ error: "Failed to update answer." });
  }
}

async function remove(req, res) {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found." });
    await answer.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete answer." });
  }
}

module.exports = { getAll, getById, create, update, remove };