import Exam from "../models/exam.model.js";

export async function create(req, res) {
  const { id_user, exam_name, board, level, year, position } = req.body;
  if (!id_user || !exam_name || !board || !level || !year || !position) {
    return res.status(400).json({ message: "Missing required fields." });
  }
  try {
    const newExam = await Exam.create({
      id_user,
      exam_name,
      board,
      level,
      year,
      position,
    });
    res.status(201).json(newExam);
  } catch (error) {
    res.status(500).json({ message: "Error creating exam.", error });
  }
}

export async function getAll(_req, res) {
  try {
    const exams = await Exam.getAll();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving exams.", error });
  }
}

export async function getById(req, res) {
  const { id } = req.params;
  try {
    const exam = await Exam.getById(id);
    if (!exam) return res.status(404).json({ message: "Exam not found." });
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving exam.", error });
  }
}