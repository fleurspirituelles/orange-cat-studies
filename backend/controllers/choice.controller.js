import Choice from "../models/choice.model.js";

export async function getAll(_req, res) {
  try {
    const choices = await Choice.getAll();
    return res.status(200).json(choices);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch choices." });
  }
}

export async function getById(req, res) {
  try {
    const choice = await Choice.getById(req.params.id);
    if (!choice) {
      return res.status(404).json({ error: "Choice not found." });
    }
    return res.status(200).json(choice);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch choice." });
  }
}

export async function create(req, res) {
  const { id_question, description, letter } = req.body;
  if (!id_question || !description || !letter) {
    return res.status(400).json({ error: "Missing required fields." });
  }
  try {
    const newChoice = await Choice.create({ id_question, description, letter });
    return res.status(201).json(newChoice);
  } catch (error) {
    return res.status(400).json({ error: "Failed to create choice." });
  }
}

export async function update(req, res) {
  try {
    const updated = await Choice.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Choice not found." });
    }
    return res.status(200).json({ message: "Choice updated successfully." });
  } catch (error) {
    return res.status(400).json({ error: "Failed to update choice." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Choice.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Choice not found." });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete choice." });
  }
}