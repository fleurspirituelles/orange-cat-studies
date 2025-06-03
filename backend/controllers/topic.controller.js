import TopicModel from "../models/topic.model.js";

const TopicController = {
  getAll: async (_req, res) => {
    const topics = await TopicModel.getAll();
    res.status(200).json(topics);
  },

  getById: async (req, res) => {
    const topic = await TopicModel.getById(req.params.id);
    if (!topic) return res.sendStatus(404);
    res.status(200).json(topic);
  },

  create: async (req, res) => {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Missing required field: name" });

    const topic = await TopicModel.create({ name });
    res.status(201).json(topic);
  },

  update: async (req, res) => {
    const topic = await TopicModel.update(req.params.id, req.body);
    if (!topic) return res.sendStatus(404);
    res.status(200).json(topic);
  },

  remove: async (req, res) => {
    const deleted = await TopicModel.remove(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.status(200).json({ message: "Topic deleted" });
  },
};

export default TopicController;