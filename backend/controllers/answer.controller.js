import AnswerModel from "../models/answer.model.js";

const AnswerController = {
  getAll: async (_req, res) => {
    const answers = await AnswerModel.getAll();
    res.status(200).json(answers);
  },

  getById: async (req, res) => {
    const answer = await AnswerModel.getById(req.params.id);
    if (!answer) return res.sendStatus(404);
    res.status(200).json(answer);
  },

  create: async (req, res) => {
    const { id_user, id_question, selected_choice } = req.body;
    if (!id_user || !id_question || !selected_choice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const answer = await AnswerModel.create({
      id_user,
      id_question,
      selected_choice,
    });
    res.status(201).json(answer);
  },

  update: async (req, res) => {
    const answer = await AnswerModel.update(req.params.id, req.body);
    if (!answer) return res.sendStatus(404);
    res.status(200).json(answer);
  },

  remove: async (req, res) => {
    const deleted = await AnswerModel.remove(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.status(200).json({ message: "Answer deleted" });
  },
};

export default AnswerController;