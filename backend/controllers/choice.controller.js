import Choice from "../models/choice.model.js";

export async function getAll(req, res) {
  try {
    const choices = await Choice.getAll();
    res.status(200).json(choices);
  } catch {
    res.status(500).json({ error: "Failed to retrieve choices." });
  }
}

export async function getById(req, res) {
  try {
    const choice = await Choice.getById(req.params.id);
    if (!choice) return res.status(404).json({ error: "Choice not found." });
    res.status(200).json(choice);
  } catch {
    res.status(500).json({ error: "Failed to retrieve choice." });
  }
}

export async function create(req, res) {
  try {
    const newChoice = await Choice.create(req.body);
    res.status(201).json(newChoice);
  } catch {
    res.status(400).json({ error: "Failed to create choice." });
  }
}

export async function update(req, res) {
  try {
    const updated = await Choice.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Choice not found." });
    res.status(200).json({ message: "Choice updated successfully." });
  } catch {
    res.status(400).json({ error: "Failed to update choice." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Choice.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Choice not found." });
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete choice." });
  }
}