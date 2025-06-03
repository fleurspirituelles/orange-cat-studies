import QuestionModel from "../models/question.model.js";

const QuestionController = {
  getAll: async (_req, res) => {
    const questions = await QuestionModel.getAll();
    res.status(200).json(questions);
  },

  getById: async (req, res) => {
    const question = await QuestionModel.getById(req.params.id);
    if (!question) return res.sendStatus(404);
    res.status(200).json(question);
  },

  create: async (req, res) => {
    const { id_exam, statement, answer_key } = req.body;
    if (!id_exam || !statement || !answer_key) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const question = await QuestionModel.create({
      id_exam,
      statement,
      answer_key,
    });
    res.status(201).json(question);
  },

  update: async (req, res) => {
    const question = await QuestionModel.update(req.params.id, req.body);
    if (!question) return res.sendStatus(404);
    res.status(200).json(question);
  },

  remove: async (req, res) => {
    const deleted = await QuestionModel.remove(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.status(200).json({ message: "Question deleted" });
  },
};

export default QuestionController;