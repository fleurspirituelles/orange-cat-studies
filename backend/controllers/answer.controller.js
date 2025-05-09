const Answer = require("../models/answer.model");

async function getAll(req, res) {
  const answers = await Answer.findAll();
  res.status(200).json(answers);
}

async function getById(req, res) {
  const answer = await Answer.findByPk(req.params.id);
  if (!answer) return res.status(404).end();
  res.status(200).json(answer);
}

async function create(req, res) {
  const answer = await Answer.create(req.body);
  res.status(201).json(answer);
}

async function update(req, res) {
  const answer = await Answer.findByPk(req.params.id);
  if (!answer) return res.status(404).end();
  await answer.update(req.body);
  res.status(200).json(answer);
}

async function remove(req, res) {
  const answer = await Answer.findByPk(req.params.id);
  if (!answer) return res.status(404).end();
  await answer.destroy();
  res.status(204).end();
}

module.exports = { getAll, getById, create, update, remove };