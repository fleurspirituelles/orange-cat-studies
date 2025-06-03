import ChoiceModel from "../models/choice.model.js";

const ChoiceController = {
  getAll: async (_req, res) => {
    const choices = await ChoiceModel.getAll();
    res.status(200).json(choices);
  },

  getById: async (req, res) => {
    const choice = await ChoiceModel.getById(req.params.id);
    if (!choice) return res.sendStatus(404);
    res.status(200).json(choice);
  },

  create: async (req, res) => {
    const { id_question, description, letter } = req.body;
    if (!id_question || !description || !letter) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const choice = await ChoiceModel.create({
      id_question,
      description,
      letter,
    });
    res.status(201).json(choice);
  },

  update: async (req, res) => {
    const choice = await ChoiceModel.update(req.params.id, req.body);
    if (!choice) return res.sendStatus(404);
    res.status(200).json(choice);
  },

  remove: async (req, res) => {
    const deleted = await ChoiceModel.remove(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.status(200).json({ message: "Choice deleted" });
  },
};

export default ChoiceController;