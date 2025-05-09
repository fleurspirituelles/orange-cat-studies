const Choice = require("../models/choice.model");

async function getAll(req, res) {
  const choices = await Choice.findAll();
  res.status(200).json(choices);
}

async function getById(req, res) {
  const choice = await Choice.findByPk(req.params.id);
  if (!choice) return res.status(404).end();
  res.status(200).json(choice);
}

async function create(req, res) {
  const choice = await Choice.create(req.body);
  res.status(201).json(choice);
}

async function update(req, res) {
  const choice = await Choice.findByPk(req.params.id);
  if (!choice) return res.status(404).end();
  await choice.update(req.body);
  res.status(200).json(choice);
}

async function remove(req, res) {
  const choice = await Choice.findByPk(req.params.id);
  if (!choice) return res.status(404).end();
  await choice.destroy();
  res.status(204).end();
}

module.exports = { getAll, getById, create, update, remove };