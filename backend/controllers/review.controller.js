const Review = require("../models/review.model");

async function getAll(req, res) {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch {
    res.status(500).json({ error: "Failed to retrieve reviews." });
  }
}

async function getById(req, res) {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found." });
    res.status(200).json(review);
  } catch {
    res.status(500).json({ error: "Failed to retrieve review." });
  }
}

async function create(req, res) {
  try {
    const review = await Review.create(req.body);
    res.status(201).json(review);
  } catch {
    res.status(400).json({ error: "Failed to create review." });
  }
}

async function update(req, res) {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found." });
    await review.update(req.body);
    res.status(200).json(review);
  } catch {
    res.status(400).json({ error: "Failed to update review." });
  }
}

async function remove(req, res) {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found." });
    await review.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete review." });
  }
}

module.exports = { getAll, getById, create, update, remove };