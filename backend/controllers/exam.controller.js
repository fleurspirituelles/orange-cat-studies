import ExamModel from "../models/exam.model.js";

const ExamController = {
  getAll: async (_req, res) => {
    const exams = await ExamModel.getAll();
    res.status(200).json(exams);
  },

  getById: async (req, res) => {
    const exam = await ExamModel.getById(req.params.id);
    if (!exam) return res.sendStatus(404);
    res.status(200).json(exam);
  },

  create: async (req, res) => {
    const { id_user, exam_name, board, level, year, position } = req.body;
    if (!id_user || !exam_name || !board || !level || !year || !position) {
      return res.status(400).json({ message: "Missing required fields." });
    }
    const exam = await ExamModel.create(req.body);
    res.status(201).json(exam);
  },

  update: async (req, res) => {
    const exam = await ExamModel.update(req.params.id, req.body);
    if (!exam) return res.sendStatus(404);
    res.status(200).json(exam);
  },

  remove: async (req, res) => {
    const deleted = await ExamModel.remove(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.status(200).json({ message: "Exam deleted." });
  },
};

export default ExamController;