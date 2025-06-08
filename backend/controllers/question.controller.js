import Question from "../models/question.model.js";

export async function getAll(_req, res) {
  try {
    const questions = await Question.getAll();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving questions.", error });
  }
}

export async function getById(req, res) {
  const { id } = req.params;
  try {
    const question = await Question.getById(id);
    if (!question) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving question.", error });
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
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: "Error creating question.", error });
  }
}

export async function update(req, res) {
  const { id } = req.params;
  try {
    const success = await Question.update(id, req.body);
    if (!success) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.status(200).json({ message: "Question updated." });
  } catch (error) {
    res.status(500).json({ message: "Error updating question.", error });
  }
}

export async function remove(req, res) {
  const { id } = req.params;
  try {
    const success = await Question.remove(id);
    if (!success) {
      return res.status(404).json({ message: "Question not found." });
    }
    res.status(200).json({ message: "Question deleted." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting question.", error });
  }
}