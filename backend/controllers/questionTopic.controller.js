const QuestionTopic = require("../models/questionTopic.model");

async function getAll(req, res) {
  const relations = await QuestionTopic.findAll();
  res.status(200).json(relations);
}

async function getById(req, res) {
  const { id_question, id_topic } = req.params;
  const relation = await QuestionTopic.findOne({
    where: { id_question, id_topic },
  });
  if (!relation) return res.status(404).end();
  res.status(200).json(relation);
}

async function create(req, res) {
  const relation = await QuestionTopic.create(req.body);
  res.status(201).json(relation);
}

async function remove(req, res) {
  const { id_question, id_topic } = req.params;
  const deleted = await QuestionTopic.destroy({
    where: { id_question, id_topic },
  });
  if (!deleted) return res.status(404).end();
  res.status(204).end();
}

module.exports = { getAll, getById, create, remove };