import Exam from "../models/exam.model.js";
import Question from "../models/question.model.js";
import Choice from "../models/choice.model.js";
import { extractQuestionsFromText } from "../utils/textProcessor.js";

export async function create(req, res) {
  const { id_user, exam_name, board, level, year, position } = req.body;
  if (!id_user || !exam_name || !board || !level || !year || !position) {
    return res.status(400).json({ message: "Missing fields." });
  }
  try {
    const exam = await Exam.create({
      id_user,
      exam_name,
      board,
      level,
      year,
      position,
    });
    return res.status(201).json(exam);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating exam.", error: err.message });
  }
}

export async function previewQuestions(req, res) {
  const { examText, answerText } = req.body;
  if (!examText || !answerText) {
    return res.status(400).json({ message: "Missing examText or answerText." });
  }
  try {
    const questions = extractQuestionsFromText(examText, answerText);
    return res.json(questions);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to parse text.", error: err.message });
  }
}

export async function importQuestions(req, res) {
  const { id_exam, questions } = req.body;
  if (!id_exam || !Array.isArray(questions)) {
    return res.status(400).json({ message: "Missing id_exam or questions." });
  }
  try {
    for (const q of questions) {
      const qrec = await Question.create({
        id_exam,
        statement: q.statement,
        answer_key: q.answer_key,
      });
      for (const [letter, desc] of Object.entries(q.choices)) {
        await Choice.create({
          id_question: qrec.id_question,
          letter,
          description: desc,
        });
      }
    }
    return res.json({ imported: questions.length });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to import.", error: err.message });
  }
}