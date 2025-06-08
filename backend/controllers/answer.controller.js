import Answer from "../models/answer.model.js";

export async function getAll(req, res) {
  try {
    const answers = await Answer.getAll();
    res.status(200).json(answers);
  } catch {
    res.status(500).json({ error: "Failed to retrieve answers." });
  }
}

export async function getById(req, res) {
  try {
    const answer = await Answer.getById(req.params.id);
    if (!answer) return res.status(404).json({ error: "Answer not found." });
    res.status(200).json(answer);
  } catch {
    res.status(500).json({ error: "Failed to retrieve answer." });
  }
}

export async function create(req, res) {
  try {
    const newAnswer = await Answer.create(req.body);
    res.status(201).json(newAnswer);
  } catch {
    res.status(400).json({ error: "Failed to create answer." });
  }
}

export async function update(req, res) {
  try {
    const updated = await Answer.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Answer not found." });
    res.status(200).json({ message: "Answer updated successfully." });
  } catch {
    res.status(400).json({ error: "Failed to update answer." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Answer.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Answer not found." });
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete answer." });
  }
}