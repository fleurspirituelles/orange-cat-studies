const Topic = require("../models/topic.model");

async function getAll(req, res) {
  const topics = await Topic.findAll();
  res.status(200).json(topics);
}

async function getById(req, res) {
  const topic = await Topic.findByPk(req.params.id);
  if (!topic) return res.status(404).end();
  res.status(200).json(topic);
}

async function create(req, res) {
  const topic = await Topic.create(req.body);
  res.status(201).json(topic);
}

async function update(req, res) {
  const topic = await Topic.findByPk(req.params.id);
  if (!topic) return res.status(404).end();
  await topic.update(req.body);
  res.status(200).json(topic);
}

async function remove(req, res) {
  const topic = await Topic.findByPk(req.params.id);
  if (!topic) return res.status(404).end();
  await topic.destroy();
  res.status(204).end();
}

module.exports = { getAll, getById, create, update, remove };
