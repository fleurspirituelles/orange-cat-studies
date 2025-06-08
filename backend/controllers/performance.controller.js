import Performance from "../models/performance.model.js";

export async function getAll(_req, res) {
  try {
    const records = await Performance.getAll();
    res.status(200).json(records);
  } catch {
    res.status(500).json({ error: "Failed to retrieve performance records." });
  }
}

export async function getById(req, res) {
  try {
    const record = await Performance.getById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: "Performance not found." });
    }
    res.status(200).json(record);
  } catch {
    res.status(500).json({ error: "Failed to retrieve performance." });
  }
}

export async function create(req, res) {
  try {
    const newRecord = await Performance.create(req.body);
    res.status(201).json(newRecord);
  } catch {
    res.status(400).json({ error: "Failed to create performance." });
  }
}

export async function update(req, res) {
  try {
    const updated = await Performance.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Performance not found." });
    }
    res.status(200).json({ message: "Performance updated successfully." });
  } catch {
    res.status(400).json({ error: "Failed to update performance." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Performance.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Performance not found." });
    }
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete performance." });
  }
}