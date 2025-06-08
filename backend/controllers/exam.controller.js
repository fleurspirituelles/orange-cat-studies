import Exam from "../models/exam.model.js";
import Question from "../models/question.model.js";
import { extractQuestionsFromPDF } from "../utils/pdfProcessor.js";

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
    if (!exam) {
      return res.status(404).json({ message: "Exam not found." });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving exam.", error });
  }
}

export async function uploadQuestions(req, res) {
  const { id_exam } = req.body;
  const examPdf = req.files?.examPdf?.[0];
  const answerPdf = req.files?.answerPdf?.[0];

  if (!id_exam || !examPdf || !answerPdf) {
    return res
      .status(400)
      .json({ message: "Missing required files or exam ID." });
  }

  try {
    const examBuffer = examPdf.buffer;
    const answerBuffer = answerPdf.buffer;

    const extracted = await extractQuestionsFromPDF(examBuffer, answerBuffer);

    const saved = await Promise.all(
      extracted.map((q) =>
        Question.create({
          id_exam,
          statement: q.statement,
          answer_key: q.answer_key,
        })
      )
    );

    res.status(201).json({ total: saved.length, saved });
  } catch (error) {
    res.status(500).json({ message: "Error processing PDF files.", error });
  }
}