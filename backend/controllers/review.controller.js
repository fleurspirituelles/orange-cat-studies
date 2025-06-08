import Review from "../models/review.model.js";

export async function getAll(_req, res) {
  try {
    const reviews = await Review.getAll();
    res.status(200).json(reviews);
  } catch {
    res.status(500).json({ error: "Failed to retrieve reviews." });
  }
}

export async function getById(req, res) {
  try {
    const review = await Review.getById(req.params.id);
    if (!review) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.status(200).json(review);
  } catch {
    res.status(500).json({ error: "Failed to retrieve review." });
  }
}

export async function create(req, res) {
  try {
    const newReview = await Review.create(req.body);
    res.status(201).json(newReview);
  } catch {
    res.status(400).json({ error: "Failed to create review." });
  }
}

export async function update(req, res) {
  try {
    const updated = await Review.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.status(200).json({ message: "Review updated successfully." });
  } catch {
    res.status(400).json({ error: "Failed to update review." });
  }
}

export async function remove(req, res) {
  try {
    const deleted = await Review.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Review not found." });
    }
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete review." });
  }
}