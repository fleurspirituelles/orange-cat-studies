const Choice = require("../models/choice.model");

async function getAll(req, res) {
  try {
    const choices = await Choice.findAll();
    res.status(200).json(choices);
  } catch {
    res.status(500).json({ error: "Failed to retrieve choices." });
  }
}

async function getById(req, res) {
  try {
    const choice = await Choice.findByPk(req.params.id);
    if (!choice) return res.status(404).json({ error: "Choice not found." });
    res.status(200).json(choice);
  } catch {
    res.status(500).json({ error: "Failed to retrieve choice." });
  }
}

async function create(req, res) {
  try {
    const choice = await Choice.create(req.body);
    res.status(201).json(choice);
  } catch {
    res.status(400).json({ error: "Failed to create choice." });
  }
}

async function update(req, res) {
  try {
    const choice = await Choice.findByPk(req.params.id);
    if (!choice) return res.status(404).json({ error: "Choice not found." });
    await choice.update(req.body);
    res.status(200).json(choice);
  } catch {
    res.status(400).json({ error: "Failed to update choice." });
  }
}

async function remove(req, res) {
  try {
    const choice = await Choice.findByPk(req.params.id);
    if (!choice) return res.status(404).json({ error: "Choice not found." });
    await choice.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete choice." });
  }
}

module.exports = { getAll, getById, create, update, remove };