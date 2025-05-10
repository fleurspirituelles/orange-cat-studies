const Performance = require("../models/performance.model");

async function getAll(req, res) {
  try {
    const records = await Performance.findAll();
    res.status(200).json(records);
  } catch {
    res.status(500).json({ error: "Failed to retrieve performance records." });
  }
}

async function getById(req, res) {
  try {
    const record = await Performance.findByPk(req.params.id);
    if (!record)
      return res.status(404).json({ error: "Performance not found." });
    res.status(200).json(record);
  } catch {
    res.status(500).json({ error: "Failed to retrieve performance." });
  }
}

async function create(req, res) {
  try {
    const record = await Performance.create(req.body);
    res.status(201).json(record);
  } catch {
    res.status(400).json({ error: "Failed to create performance." });
  }
}

async function update(req, res) {
  try {
    const record = await Performance.findByPk(req.params.id);
    if (!record)
      return res.status(404).json({ error: "Performance not found." });
    await record.update(req.body);
    res.status(200).json(record);
  } catch {
    res.status(400).json({ error: "Failed to update performance." });
  }
}

async function remove(req, res) {
  try {
    const record = await Performance.findByPk(req.params.id);
    if (!record)
      return res.status(404).json({ error: "Performance not found." });
    await record.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete performance." });
  }
}

module.exports = { getAll, getById, create, update, remove };