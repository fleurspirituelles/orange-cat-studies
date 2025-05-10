const User = require("../models/user.model");

async function create(req, res) {
  const data = req.body;
  const user = await User.create(data);
  res.status(201).json(user);
}

async function getAll(req, res) {
  const users = await User.findAll();
  res.status(200).json(users);
}

async function getById(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).end();
  res.status(200).json(user);
}

async function update(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).end();
  await user.update(req.body);
  res.status(200).json(user);
}

async function remove(req, res) {
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).end();
  await user.destroy();
  res.status(204).end();
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};