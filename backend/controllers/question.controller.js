import Question from "../models/question.model.js";

export async function getAll(_req, res) {
  try {
    const questions = await Question.getAll();
    return res.status(200).json(questions);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving questions.", error });
  }
}

export async function getById(req, res) {
  try {
    const question = await Question.getById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }
    return res.status(200).json(question);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error retrieving question.", error });
  }
}

export async function create(req, res) {
  const { id_exam, statement, answer_key } = req.body;
  if (!id_exam || !statement || !answer_key) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newQuestion = await Question.create({
      id_exam,
      statement,
      answer_key,
    });
    return res.status(201).json(newQuestion);
  } catch (error) {
    return res.status(500).json({ message: "Error creating question.", error });
  }
}

export async function update(req, res) {
  try {
    const updated = await Question.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Question not found." });
    }
    return res.status(200).json({ message: "Question updated successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error updating question.", error });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Question.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Question not found." });
    }
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({ message: "Error deleting question.", error });
  }
}