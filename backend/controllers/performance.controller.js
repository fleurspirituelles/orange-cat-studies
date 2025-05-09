const Performance = require("../models/performance.model");

async function getAll(req, res) {
  const records = await Performance.findAll();
  res.status(200).json(records);
}

async function getById(req, res) {
  const record = await Performance.findByPk(req.params.id);
  if (!record) return res.status(404).end();
  res.status(200).json(record);
}

async function create(req, res) {
  const record = await Performance.create(req.body);
  res.status(201).json(record);
}

async function update(req, res) {
  const record = await Performance.findByPk(req.params.id);
  if (!record) return res.status(404).end();
  await record.update(req.body);
  res.status(200).json(record);
}

async function remove(req, res) {
  const record = await Performance.findByPk(req.params.id);
  if (!record) return res.status(404).end();
  await record.destroy();
  res.status(204).end();
}

module.exports = { getAll, getById, create, update, remove };