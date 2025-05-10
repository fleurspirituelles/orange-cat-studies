const Topic = require("../models/topic.model");

async function getAll(req, res) {
  try {
    const topics = await Topic.findAll();
    res.status(200).json(topics);
  } catch {
    res.status(500).json({ error: "Failed to retrieve topics." });
  }
}

async function getById(req, res) {
  try {
    const topic = await Topic.findByPk(req.params.id);
    if (!topic) return res.status(404).json({ error: "Topic not found." });
    res.status(200).json(topic);
  } catch {
    res.status(500).json({ error: "Failed to retrieve topic." });
  }
}

async function create(req, res) {
  try {
    const topic = await Topic.create(req.body);
    res.status(201).json(topic);
  } catch {
    res.status(400).json({ error: "Failed to create topic." });
  }
}

async function update(req, res) {
  try {
    const topic = await Topic.findByPk(req.params.id);
    if (!topic) return res.status(404).json({ error: "Topic not found." });
    await topic.update(req.body);
    res.status(200).json(topic);
  } catch {
    res.status(400).json({ error: "Failed to update topic." });
  }
}

async function remove(req, res) {
  try {
    const topic = await Topic.findByPk(req.params.id);
    if (!topic) return res.status(404).json({ error: "Topic not found." });
    await topic.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete topic." });
  }
}

module.exports = { getAll, getById, create, update, remove };