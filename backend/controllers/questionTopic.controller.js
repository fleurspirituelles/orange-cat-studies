const QuestionTopic = require("../models/questionTopic.model");

async function getAll(req, res) {
  try {
    const relations = await QuestionTopic.findAll();
    res.status(200).json(relations);
  } catch {
    res.status(500).json({ error: "Failed to retrieve relations." });
  }
}

async function getById(req, res) {
  try {
    const { id_question, id_topic } = req.params;
    const relation = await QuestionTopic.findOne({
      where: { id_question, id_topic },
    });
    if (!relation)
      return res.status(404).json({ error: "Relation not found." });
    res.status(200).json(relation);
  } catch {
    res.status(500).json({ error: "Failed to retrieve relation." });
  }
}

async function create(req, res) {
  try {
    const relation = await QuestionTopic.create(req.body);
    res.status(201).json(relation);
  } catch {
    res.status(400).json({ error: "Failed to create relation." });
  }
}

async function remove(req, res) {
  try {
    const { id_question, id_topic } = req.params;
    const deleted = await QuestionTopic.destroy({
      where: { id_question, id_topic },
    });
    if (!deleted) return res.status(404).json({ error: "Relation not found." });
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete relation." });
  }
}

module.exports = { getAll, getById, create, remove };