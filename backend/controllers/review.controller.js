import ReviewModel from "../models/review.model.js";

const ReviewController = {
  getAll: async (_req, res) => {
    const reviews = await ReviewModel.getAll();
    res.status(200).json(reviews);
  },

  getById: async (req, res) => {
    const review = await ReviewModel.getById(req.params.id);
    if (!review) return res.sendStatus(404);
    res.status(200).json(review);
  },

  create: async (req, res) => {
    const { id_user, id_question } = req.body;
    if (!id_user || !id_question) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const review = await ReviewModel.create({ id_user, id_question });
    res.status(201).json(review);
  },

  remove: async (req, res) => {
    const deleted = await ReviewModel.remove(req.params.id);
    if (!deleted) return res.sendStatus(404);
    res.status(200).json({ message: "Review deleted" });
  },
};

export default ReviewController;