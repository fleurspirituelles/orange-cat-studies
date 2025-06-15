import Exam from "../models/exam.model.js";
import Question from "../models/question.model.js";
import Choice from "../models/choice.model.js";
import { extractQuestionsFromText } from "../utils/textProcessor.js";
import multer from "multer";
import pdf from "pdf-parse/lib/pdf-parse.js";
import User from "../models/user.model.js";

const upload = multer({ storage: multer.memoryStorage() });

async function getIdUserByFirebase(req) {
  const uid = req.user.uid;
  const user = await User.getByUID(uid);
  return user?.id_user;
}

export async function listExams(req, res) {
  try {
    const id_user = await getIdUserByFirebase(req);
    if (!id_user) return res.status(401).json({ message: "Unauthorized." });

    const exams = await Exam.getByUser(id_user);
    return res.status(200).json(exams);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching exams.", error: err.message });
  }
}

export async function getById(req, res) {
  try {
    const exam = await Exam.getById(req.params.id);
    if (!exam) {
      return res.status(404).json({ error: "Exam not found." });
    }
    return res.status(200).json(exam);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching exam.", error: err.message });
  }
}

export async function create(req, res) {
  const id_user = await getIdUserByFirebase(req);
  if (!id_user) return res.status(401).json({ message: "Unauthorized." });

  const { name, year, exam_board, position, level } = req.body;

  if (!name || !year || !exam_board || !position || !level) {
    return res.status(400).json({ message: "Missing fields." });
  }

  try {
    const exam = await Exam.create({
      id_user,
      exam_name: name,
      board: exam_board,
      year,
      position,
      level,
    });
    return res.status(201).json(exam);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error creating exam.", error: err.message });
  }
}

export async function update(req, res) {
  try {
    const { name, year, exam_board, position, level } = req.body;

    const updated = await Exam.update(req.params.id, {
      exam_name: name,
      board: exam_board,
      year,
      position,
      level,
    });

    if (!updated) {
      return res.status(404).json({ error: "Exam not found." });
    }
    return res.status(200).json({ message: "Exam updated successfully." });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Failed to update exam.", error: err.message });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Exam.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Exam not found." });
    }
    return res.status(204).end();
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to delete exam.", error: err.message });
  }
}

export async function previewQuestions(req, res) {
  const { examText, answerText } = req.body;
  if (!examText || !answerText) {
    return res
      .status(400)
      .json({ message: "Missing exam text or answer text." });
  }
  try {
    const questions = extractQuestionsFromText(examText, answerText);
    return res.status(200).json(questions);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to parse text.", error: err.message });
  }
}

export const previewPdfUpload = [
  upload.fields([
    { name: "examPdf", maxCount: 1 },
    { name: "answerPdf", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const examFile = req.files?.examPdf?.[0];
      const answerFile = req.files?.answerPdf?.[0];
      if (!examFile || !answerFile) {
        return res
          .status(400)
          .json({ message: "Missing exam or answer file." });
      }

      const { text: examText } = await pdf(examFile.buffer);
      const { text: answerText } = await pdf(answerFile.buffer);
      const questions = extractQuestionsFromText(examText, answerText);
      return res.status(200).json(questions);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Failed to parse PDF.", error: err.message });
    }
  },
];

export async function importQuestions(req, res) {
  const { id_exam, questions } = req.body;
  if (!id_exam || !Array.isArray(questions)) {
    return res.status(400).json({ message: "Missing exam ID or questions." });
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
    return res.status(200).json({ imported: questions.length });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to import questions.", error: err.message });
  }
}