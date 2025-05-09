const Review = require("../models/review.model");

async function getAll(req, res) {
  const reviews = await Review.findAll();
  res.status(200).json(reviews);
}

async function getById(req, res) {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).end();
  res.status(200).json(review);
}

async function create(req, res) {
  const review = await Review.create(req.body);
  res.status(201).json(review);
}

async function update(req, res) {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).end();
  await review.update(req.body);
  res.status(200).json(review);
}

async function remove(req, res) {
  const review = await Review.findByPk(req.params.id);
  if (!review) return res.status(404).end();
  await review.destroy();
  res.status(204).end();
}

module.exports = { getAll, getById, create, update, remove };