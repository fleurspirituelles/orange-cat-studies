import Topic from "../models/topic.model.js";

export async function getAll(_req, res) {
  try {
    const topics = await Topic.getAll();
    res.status(200).json(topics);
  } catch {
    res.status(500).json({ error: "Failed to retrieve topics." });
  }
}

export async function getById(req, res) {
  try {
    const topic = await Topic.getById(req.params.id);
    if (!topic) {
      return res.status(404).json({ error: "Topic not found." });
    }
    res.status(200).json(topic);
  } catch {
    res.status(500).json({ error: "Failed to retrieve topic." });
  }
}

export async function create(req, res) {
  try {
    const newTopic = await Topic.create(req.body);
    res.status(201).json(newTopic);
  } catch {
    res.status(400).json({ error: "Failed to create topic." });
  }
}

export async function update(req, res) {
  try {
    const updated = await Topic.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Topic not found." });
    }
    res.status(200).json({ message: "Topic updated successfully." });
  } catch {
    res.status(400).json({ error: "Failed to update topic." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Topic.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Topic not found." });
    }
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete topic." });
  }
}