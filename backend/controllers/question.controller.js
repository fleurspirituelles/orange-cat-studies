import Question from "../models/question.model.js";

export async function getAll(_req, res) {
  try {
    const questions = await Question.getAll();
    res.status(200).json(questions);
  } catch {
    res.status(500).json({ error: "Failed to retrieve questions." });
  }
}

export async function getById(req, res) {
  try {
    const question = await Question.getById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found." });
    }
    res.status(200).json(question);
  } catch {
    res.status(500).json({ error: "Failed to retrieve question." });
  }
}

export async function create(req, res) {
  try {
    const newQuestion = await Question.create(req.body);
    res.status(201).json(newQuestion);
  } catch {
    res.status(400).json({ error: "Failed to create question." });
  }
}

export async function update(req, res) {
  try {
    const updated = await Question.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Question not found." });
    }
    res.status(200).json({ message: "Question updated successfully." });
  } catch {
    res.status(400).json({ error: "Failed to update question." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Question.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Question not found." });
    }
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete question." });
  }
}