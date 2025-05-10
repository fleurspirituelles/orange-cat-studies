const User = require("../models/user.model");

async function getAll(req, res) {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch {
    res.status(500).json({ error: "Failed to retrieve users." });
  }
}

async function getById(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: "Failed to retrieve user." });
  }
}

async function create(req, res) {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch {
    res.status(400).json({ error: "Failed to create user." });
  }
}

async function update(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    await user.update(req.body);
    res.status(200).json(user);
  } catch {
    res.status(400).json({ error: "Failed to update user." });
  }
}

async function remove(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found." });
    await user.destroy();
    res.status(204).end();
  } catch {
    res.status(500).json({ error: "Failed to delete user." });
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};